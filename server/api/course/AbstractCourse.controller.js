'use strict';

import AbstractCourse from './AbstractCourse.model';
import * as controller from './../problem/';
import shared from './../../config/environment/shared';
import Assignment from './assignment.model';
import Problem from './../problem/problem.model';
import TailoredCourse from './TailoredCourse.model';

export function index(req, res) {
  AbstractCourse.find()
    .exec()
    .then(function(courses) {
       return res.status(200).json(courses);
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
  AbstractCourse.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      return res.status(204).end();
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
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

  // Create Assignments for TailoredCourse
  var tailoredAssignments = [];
  for(var i = 0; i < course.assignments.length; i++) {
    console.log("Loop over assignments");
    console.log('Loop over assignments');
    console.log(course.assignments[i]);
     var newAssignment = generateAssignmentsWith(course, course.assignments[i]);
     tailoredAssignments.push(newAssignment)
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
<<<<<<< HEAD
   });
    console.log(newTailoredCourse);
    // Add course to user object
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
function generateAssignmentsWith(course,assignment) {
=======
  });

  // Add course to user object
  user.courses.push(newTailoredCourse);
  user.save();
}//end create tailored course

/**
 * Generate a new assignment with problems based on the pre-defined
 * parameters from a AbstractCourse and AbstractCourse.assignment
 *
 * TODO: Improve the question requesting process and ensure that new are added to the DB and old are properly queried
 * TODO: Some of the attributes are not being copied into the new objects
 *
 * @params {Course} course
 * @params {Assignment} assignment
 * @return {Assignment}
 */
function generateAssignmentsWith(course, assignment) {
>>>>>>> 3f52e61a80856244ffdac9dc402998379d2d3e0f
  // Generate problems with parameters
  var problems = [];
  var numberOfProblems = Math.floor(Math.random() * assignment.maxNumProblems) + assignment.minNumProblems;
  var numberOfNew = Math.floor(numberOfProblems*(assignment.newProblemPercentage/100));
  var numberOfNew = Math.floor(numberOfProblems * (assignment.newProblemPercentage / 100));

  // TODO: 1) Generate new problems and fetch old ones
  // 1. Using numberOfNew, query problems from problems.controller using params in assignment
  // 2. Store new problems in Problems Mongo Collection
  // 3. Using numberOfProblems - numberOfNew, query problems from Problems Mongo Collection  \
  // TODO: 2) Store in problems[]

  // Create Assignment with problems
  var newAssignment = new Assignment({
    minNumProblems: assignment.minNumProblems,
    maxNumProblems: assignment.maxNumProblems,
    newProblemPercentage: assignment.newProblemPercentage,
    problems: problems
   });
    problems
  });

  // Return assignment to be added to the TailoredCourse
  return newAssignment;

}//end generate assignments

//only allow the course teacher or role greater than teacher permission
export function hasPermission(req, course) {
  return new Promise(function(resolve, reject) {
    if(!course.teacherID.equals(req.user._id) && shared.userRoles.indexOf(req.user.role) < shared.userRoles.indexOf('teacher') + 1) {
      reject();
    } else {
    if(shared.userRoles.indexOf(req.user.role) > shared.userRoles.indexOf('teacher') || course.teacherID.equals(req.user._id)) {
      resolve();
    } else {
      reject();
    }
  });
}
