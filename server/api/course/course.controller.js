'use strict';

import Course from './course.model';
import TailoredCourse from './tailoredCourse.model';
import shared from './../../config/environment/shared';

export function index(req, res) {
  Course.find()
    .exec()
    .then(function (courses) {
      return res.status(200).json(courses);
    })
    //Print errors
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}


export function show(req, res) {
  Course.findById(req.params.id)
    .exec()
    .then(function (course) {
      if (course) {
        return res.status(200).json(course);
      } else {
        return res.status(204).end();
      }
    })
    //Print errors
    .catch(function (err) {
      res.send(err);
      return res.status(404).end();
    });
}


export function create(req, res) {
  let course = req.body;
  Course.create(course)
    .then(function (createdCourse) {
      createdCourse.teacherID = req.user._id;
      createdCourse.save();
      return res.status(201).json(createdCourse);
    })
    //Print errors
    .catch(function (err) {
      res.send(err);
      return res.status(400).end();
    });
}

export function update(req, res) {
  return Course.findById(req.params.id).exec()
    .then(course => {
      if (course) {
        hasPermission(req, course).then(() => {
          course.subject = req.body.subject;
          course.maxStudents = req.body.maxStudents;
          //add more stuff to update as course metadata gets added
          return course.save()
            .then(() => {
              return res.status(204).end();
            })
            .catch(function () {
              return res.status(404).end();
            });
        })
          .catch(function () {
            return res.status(403).end();
          });
      } else {
        return res.status(403).end();
      }
    });
}

export function destroy(req, res) {
  Course.findByIdAndRemove(req.params.id).exec()
    .then(function () {
      return res.status(204).end();
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}
/*
 * Add student id to enrolled students in course
 */

export function addStudent(req, res) {
  Course.findById(req.params.id)
    .exec()
    .then(function (course) {
      if (course) {
        course.enrolledStudents.push(req.user._id);
        course.save();
        createCourseAndAddToStudent(req.user, course);
        return res.status(201).json(course);
      } else {
        return res.status(204).end();
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

function createCourseAndAddToStudent(user, course) {
  // Using predefined assignment information from course, create a new tailored Course

  // Create Assignments for TailoredCourse
  var tailoredAssignments = [];
  for (var assignment in course.assignments) {
     var newAssignment = generateAssignmentsWith(assignment);
     tailoredAssignments.push(tailoredAssignments)
  }

  // Create TailoredCourse
  var newTailoredCourse = TailoredCourse.create({
            subject: course.subject,
            assignments: tailoredAssignments
           })

    // Add course to user object
    user.courses.push(newTailoredCourse);
    user.save();
}

function generateAssignmentWith(assignment) {
  // Generate problems with parameters
  var problems = [];


  // Create Assignment with problems
  var newAssignment = Assignment.create({

    //Assignment Parameters and add problems

  })

  return newAssignment

}

//only allow the course teacher or role greater than teacher permission
export function hasPermission(req, course) {
  return new Promise(function (resolve, reject) {
    if (!course.teacherID.equals(req.user._id) && shared.userRoles.indexOf(req.user.role) < shared.userRoles.indexOf('teacher') + 1) {
      reject();
    } else {
      resolve();
    }
  });
}
