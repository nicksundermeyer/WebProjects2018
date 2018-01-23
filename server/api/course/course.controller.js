'use strict';

import Course from './course.model';
import * as controller from './../problem/';
import shared from './../../config/environment/shared';
import Assignment from './assignment.model';
import Problem from './../problem/problem.model'

export function index(req, res) {
  Course.find()
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
  Course.findById(req.params.id)
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
  Course.create(course)
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
  return Course.findById(req.params.id).exec()
    .then(course => {
      if(course) {
        hasPermission(req, course).then(() => {
          course.subject = req.body.subject;
          course.maxStudents = req.body.maxStudents;
          //add more stuff to update as course metadata gets added
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
  Course.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      return res.status(204).end();
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}
/*
 * Add student id to enrolled students in course
 */

export function addStudent(req, res) {
console.log("--Add Student to Course--");
  Course.findById(req.params.id)
    .exec()
    .then(function(course) {
      if(course) {
        course.enrolledStudents.push(req.user._id);
        course.save();
        console.log("--Create TailoredCourse--");
        createCourseAndAddToStudent(req.user, course);
        return res.status(201).json(course);
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
* TODO: Make function a promise so that it will return resolved and avoid the addStudent function from timming out. I am not sure how to go about doing this.
*
* @params {User} user - Student that is getting the tailoredCourse
* @params {Course} - The abstractCourse with details on for creating the tailored Course
*/
function createCourseAndAddToStudent(user, course) {
  // Using predefined assignment information from course, create a new tailored Course

  // Create Assignments for TailoredCourse
  console.log("--Create Assignments--");
  var tailoredAssignments = [];
  console.log(course.assignments);
  for (var assignment in course.assignments) {
    console.log("Loop over assignments");
    console.log(assignment);
     var newAssignment = generateAssignmentsWith(course, assignment);
     tailoredAssignments.push(tailoredAssignments)
  }

  // Create TailoredCourse
  console.log("--Create TailoredCourse To add--");
  var newTailoredCourse = TailoredCourse.create({
    name: course.name,
    description: course.description,
    subjects: course.subjects,
    categories: course.categories,
    teacherID: course.teacherID,
    assignments: tailoredAssignments
   });

    // Add course to user object
    console.log("--Add TailoredCourse--");
    user.courses.push(newTailoredCourse);
    user.save();
}

/**
* Generate a new assignment with problems based on the pre-defined
* parameters from a AbstractCourse and AbstractCourse.assignment
*
* TODO: Improve the question requesting process and ensure that new are added to the DB and old are properly queried
*
* @params {Course} course
* @params {Assignment} assignment
* @return {Assignment}
*/
function generateAssignmentWith(course,assignment) {
  console.log("--Generate Problems--");
  // Generate problems with parameters
  var problems = [];
  var numberOfProblems = Math.floor(Math.random() * assignment.maxNumProblems) + assignment.minNumProblems;
  var numberOfNew = Math.floor(numberOfProblems*(newProblemPercentage/100));

  //Get old problems
  console.log("--Get Old Problems--");
  Problem.find({ "problem.subject": course.subjects[0], "problem.category": course.categories[0]})
    .limit(numberOfProblems - numberOfNew)
    .exec(function(err, fetchedProblems) {
      if(err) {
        console.log(err);
        return
      } else {
        console.log(fetchedProblems)
      }
    });

  var req = {
    "protocol" : "dpg",
      "version" : "0.1",
      "problem" :
      {
        "subject" : "algebra",
        "category" : "multiplication",
        "depth" : 1
      }
  }
  console.log("--Request New Problems--");
  var response;
  var newProblems = controller.create(req,response);
  console.log(response);

  console.log("--Create Assignment--");
  // Create Assignment with problems
  var newAssignment = Assignment.create({

    minNumProblems: assignment.minNumProblems,
    maxNumProblems: assignment.maxNumProblems,
    newProblemPercentage: assignment.maxNumProblems,
    problems: problems

   });
  console.log(newAssignment);
  // Return assignment to be added to the TailoredCourse
  return newAssignment

}

//only allow the course teacher or role greater than teacher permission
export function hasPermission(req, course) {
  return new Promise(function(resolve, reject) {
    if(!course.teacherID.equals(req.user._id) && shared.userRoles.indexOf(req.user.role) < shared.userRoles.indexOf('teacher') + 1) {
      reject();
    } else {
      resolve();
    }
  });
}
