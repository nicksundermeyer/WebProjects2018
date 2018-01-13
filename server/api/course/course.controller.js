'use strict';

import Course from './course.model';

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
      return res.status(400).end();
    });
}

export function update(req, res) {

  return Course.findById(req.params.id).exec()
    .then(course => {
      if (course) {
        course.subject = req.body.subject;
        course.maxStudents = req.body.maxStudents;
        //add more stuff to update as course metadata gets added
        return course.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(function(err){
            return res.status(404).end();
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
    .catch(function(err) {
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
        return res.status(201).json(course);
      } else {
        return res.status(204);
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(400);
      res.send(err);
    });
}

