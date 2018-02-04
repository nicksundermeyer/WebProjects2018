'use strict';

import AbstractCourse from './AbstractCourse.model';
import * as problemController from '../problem/problem.controller';
import shared from './../../config/environment/shared';
import Assignment from './assignment.model';
import Problem from '../problem/problem.model';
import TailoredCourse from './TailoredCourse.model';
import User from '../user/user.model';


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
  return AbstractCourse.findById(req.params.id)
    .exec()
    .then(function(course) {
      if(course) {
        return createCourseAndAddToStudent(req.user, course).then(() => {
          return User.findOne({_id: req.user._id}, '-salt -password -courses.assignments.problems.problem.solution').exec()
            .then(user => {
              if(!user) {
                return res.status(401).end();
              }
              return res.json(user).status(201);
            })
            .catch(err => console.log('err in add student', err));
        });
      } else {
        return res.status(204).end();
      }
    })
    .catch(function(err) {
      console.log('err in finding course', err);
      res.status(400);
      res.send(err);
    });
}

/**
 * Generate a TailoredCourse that is specific to the student
 * include unique assignments and problems*
 * @params {User} user - Student that is getting the tailoredCourse
 * @params {Course} - The abstractCourse with details on for creating the tailored Course
 */
function createCourseAndAddToStudent(user, course) {
  var tailoredAssignments = [];

  for(var i = 0; i < course.assignments.length; i++) {
    tailoredAssignments.push(generateAssignmentsWith(course, course.assignments[i]));
  }

  return Promise.all(tailoredAssignments).then(ta => {
    var tailoredCourse = new TailoredCourse();
    tailoredCourse.abstractCourseID = course._id;
    tailoredCourse.studentID = user._id;
    tailoredCourse.subjects = course.subjects;
    tailoredCourse.categories = course.categories;

    ta.forEach(function(item) {
      tailoredCourse.assignments.push(item);
    });

    return tailoredCourse.save().then(tc => {
      return User.update(
        { _id: user._id},
        { $push: { courses: tc } }
      );
    });
  }).catch(err => {
    console.log('Error creating tailored assignment', err);
  });
}//end create tailored course


/**
 * Generate a new assignment with problems based on the pre-defined
 * parameters from a AbstractCourse and AbstractCourse.assignment
  * @params {Course} course
 * @params {Assignment} assignment
 * @return {Assignment}
 */
function generateAssignmentsWith(course, assignment) {
  return new Promise(function(resolve, reject) {
      // Generate problems with parameters
    var numberOfProblems = Math.floor(Math.random() * assignment.maxNumProblems) + assignment.minNumProblems;
    var numberOfNew = Math.floor(numberOfProblems * (assignment.newProblemPercentage / 100));

    Problem.aggregate(
        [{$match: {'problem.category': course.categories}}, {$limit: (numberOfProblems - numberOfNew)}]
      ).then(results => {
        for(let i = 0; i < numberOfNew; i++) {
          results.push(problemController.create({
            protocol: 'dpg',
            version: '0.1',
            problem: {
              subject: course.subjects,
              category: course.categories,
              depth: 1
            }
          }));
        }

        return results;
      }).then(promises => {
        Promise.all(promises).then(finalProblems => {
          resolve(new Assignment({
            AbstractAssignmentId: course._id,
            title: assignment.title,
            description: assignment.description,
            problems: finalProblems
          }));
        });
      }).catch(err => {
        reject('Error getting problems', err);
      });
  }
  );
}


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
