'use strict';

import AbstractCourse from './abstractCourse.model';
import * as problemController from '../problem/problem.controller';
import shared from './../../config/environment/shared';
import AbstractAssignment from './abstractAssignment.model';
import TailoredAssignment from './tailoredAssignment.model';
import Problem from '../problem/problem.model';
import TailoredCourse from './tailoredCourse.model';
import User from '../user/user.model';
import KAS from 'kas/kas';
var MathLex = require('mathlex_server_friendly');

export function index(req, res) {
  AbstractCourse.find()
    .populate('assignments')
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
    .populate('assignments')
    .exec()
    .then(function(course) {
      //return an OK status and the course, if course exists
      return res.status(200).json(course);
    })
    .catch(function(err) {
      //if course does not exists return a not found status
      res.send(err);
      return res.status(404).end();
    });
}

export function create(req, res) {
  let course = req.body;
  AbstractCourse.create(course)
    .then(function(createdCourse) {
      //any role higher than teacher
      //can attach a teacher to the course (Need logic to attach teacher to course if a higher role)
      //so id should not be just grabber from the current user
      if(req.user.role === 'teacher') {
        //set teacher id if current user is actually a teacher
        createdCourse.teacherID = req.user._id;
      }
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
  AbstractCourse.findById(req.params.id).exec()
    .then(course => {
      if(course) {
        //update these paths
        course.name = req.body.name;
        course.description = req.body.description;
        //save course
        course.save();
        //return an OK status and the course
        return res.status(200).send(course);
      }
    })
    .catch(err => {
      //otherwise return a not found status
      res.send(err);
      return res.status(404).end();
    });
}

export function destroy(req, res) {
  AbstractCourse.findById(req.params.id).exec()
    .then(course => {
      //if course found delete course. Permanently
      course.remove();
      //return a no content status
      return res.status(204).end();
    })
    .catch(err => {
      //return a not found status
      res.send(err);
      return res.status(404).end();
    });
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
