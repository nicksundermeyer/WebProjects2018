'use strict';

import AbstractCourse from './AbstractCourse.model';
import * as problemController from '../problem/problem.controller';
import shared from './../../config/environment/shared';
import Assignment from './assignment.model';
import Problem from '../problem/problem.model';
import TailoredCourse from './TailoredCourse.model';

export function index(req, res) {
  AbstractCourse.find()
    .exec()
    .then(function(courses) {
      return res.status(200).json(courses);
    })
    //Print errors
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}



export function show(req, res) {
  AbstractCourse.findById(req.params.id)
    .exec()
    .then(function(course) {
      if(course) {
        return res.status(200).json(course);
      } else {
        return res.status(204).end();
      }
    })
    //Print errors
    .catch(function(err) {
      res.send(err);
      return res.status(404).end();
    });
}


export function create(req, res) {
  let course = req.body;
  AbstractCourse.create(course)
    .then(function(createdCourse) {
      createdCourse.teacherID = req.user._id;
      createdCourse.save();
      return res.status(201).json(createdCourse);
    })
    //Print errors
    .catch(function(err) {
      res.send(err);
      return res.status(400).end();
    });
}

export function update(req, res) {
  return AbstractCourse.findById(req.params.id).exec()
    .then(course => {
      if(course) {
        hasPermission(req, course).then(() => {
          //update abstract course
          course.name = req.body.name;
          course.description = req.body.description;
          course.maxStudents = req.body.maxStudents;

          return course.save()
            .then(() => {
              return res.status(204).end();
            })
            .catch(function() {
              return res.status(404).end();
            });
        })
          .catch(function() {
            return res.status(403).end();
          });
      } else {
        return res.status(403).end();
      }
    });
}

export function destroy(req, res) {
  AbstractCourse.findById(req.params.id).then(course => {
      if(course) {
        hasPermission(req, course).then(() => {
          course.remove();
          return res.status(204).end();
        }).catch(() => {
          return res.status(403).end();
        });
      }
    }
  ).catch(() => {
    return res.status(400).end();
  });
}

/*
 * Add student id to enrolled students in course
 */
export function addStudent(req, res) {
  AbstractCourse.findById(req.params.id)
    .exec()
    .then(function(course) {
      if(course) {
        return res.status(201).json(createCourseAndAddToStudent(req.user, course));
      } else {
        return res.status(204).end();
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

/**
 * Generate a TailoredCourse that is specific to the student
 * include unique assignments and problems
 *
 * TODO: Error handling.
 *
 * @params {User} user - Student that is getting the tailoredCourse
 * @params {Course} - The abstractCourse with details on for creating the tailored Course
 */
function createCourseAndAddToStudent(user, course) {
  // Using predefined assignment information from course, create a new tailored Course
  console.log(course.assignments.length);
  // Create Assignments for TailoredCourse
  var tailoredAssignments = [];
  for(var i = 0; i < course.assignments.length; i++) {
    console.log('Loop over assignments');
    //  console.log(course.assignments[i]);

    var newAssignment = generateAssignmentsWith(course, course.assignments[i]);
    tailoredAssignments.push(newAssignment);
  }

  // Create TailoredCourse
  var newTailoredCourse = new TailoredCourse({
    abstractCourseID: course._id,
    studentID: user._id,
    subjects: course.subjects,
    categories: course.categories,
    assignments: tailoredAssignments
  });
  // console.log(newTailoredCourse);
  // Add course to user object

  //this line gives error :(
  newTailoredCourse.save();

  return newTailoredCourse;
}//end create tailored course


/**
 * Generate a new assignment with problems based on the pre-defined
 * parameters from a AbstractCourse and AbstractCourse.assignment
 *
 * TODO: Question requesting process
 *
 * @params {Course} course
 * @params {Assignment} assignment
 * @return {Assignment}
 */
function generateAssignmentsWith(course, assignment) {
  // Generate problems with parameters
  var numberOfProblems = Math.floor(Math.random() * assignment.maxNumProblems) + assignment.minNumProblems;
  var numberOfNew = Math.floor(numberOfProblems * (assignment.newProblemPercentage / 100));
  var newProblems = [];
  var currentProblems = [];
  //assuming that there are enough matching problems in the DB when querying. We will seed enough.

  Problem.aggregate(
    [{$match: {'problem.category': course.categories}}, {$limit: (numberOfProblems - numberOfNew)}]
  ).then(results => {
    results.forEach(function(item) {
      currentProblems.push(item);
    });
  }).catch(err => {
    console.log('Error fetching existing problems', err);
  });


  for(let i = 0; i < numberOfNew; i++) {
    newProblems.push(problemController.create({
      protocol: 'dpg',
      version: '0.1',
      problem: {
        subject: course.subjects,
        category: course.categories,
        depth: 1
      }
    }));
  }


  return Promise.all(newProblems).then(probs => {
    console.log(probs);
    // Create Assignment with problems
    return new Assignment({
      minNumProblems: assignment.minNumProblems,
      maxNumProblems: assignment.maxNumProblems,
      newProblemPercentage: assignment.newProblemPercentage,
      problems: currentProblems.concat(probs)
    });

  }).catch((err) => {
    console.log('Error resolving promises', err);
  });
}//end generate assignments


//only allow the course teacher or role greater than teacher permission
export function hasPermission(req, course) {
  return new Promise(function(resolve, reject) {
    if(shared.userRoles.indexOf(req.user.role) > shared.userRoles.indexOf('teacher') || course.teacherID.equals(req.user._id)) {
      resolve();
    } else {
      reject();
    }
  });
}
