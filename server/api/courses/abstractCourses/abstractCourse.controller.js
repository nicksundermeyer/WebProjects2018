'use strict';

import AbstractCourse from './abstractCourse.model';
import * as problemController from './../problems/problem.controller';
import shared from './../../../config/environment/shared';
import AbstractAssignment from './abstractAssignment.model';
import TailoredAssignment from './../tailoredCourses/tailoredAssignment.model';
import Problem from './../problems/problem.model';
import TailoredCourse from './../tailoredCourses/tailoredCourse.model';
import User from './../../users/user.model';
import KAS from 'kas/kas';
var MathLex = require('mathlex_server_friendly');
let logger = require('./../../../config/bunyan');

export function index(req, res) {
  AbstractCourse.find()
    .populate('assignments')
    .exec()
    .then(function(courses) {
      logger.debug('Get all courses: ' + courses);
      return res.status(200).json(courses);
    })
    //Print errors
    .catch(function(err) {
      logger.error(err);
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
      logger.debug('Show course: ' + course);
      return res.status(200).json(course);
    })
    .catch(function(err) {
      //if course does not exists return a not found status
      logger.error({ error: err });
      res.send(err);
      return res.status(404).end();
    });
}

/*
 AbstractCourse.create({
 name: subject.subject + '-about-' + category,
 description: subject.subject + ' focusing on the ' + category + ' topic',
 subjects: [subject.subject],
 categories: [category],
 teacherID: teacher._id

 }).then(createdCourse =>
 AbstractAssignment.create({
 title: 'Assignment 1',
 description: 'This focuses on ' + category + ' operations',
 minNumProblems: 5,
 maxNumProblems: 10,
 newProblemPercentage: 15
 }).then(newAssignment => {
 createdCourse.assignments.push(newAssignment);
 createdCourse.save();
 return createTailoredCourse(createdCourse);
 })
 */
export function create(req, res) {
  // Only allow teachers to create courses
  if (req.user.role === 'teacher') {
    // Note: any role higher than teacher can attach a teacher to the course so
    // we eventually need logic to attach teacher to course if a higher role.
    // (ID should not be just grabbed from the current user)
    var newCourse = new AbstractCourse({
      name: req.body.name,
      description: req.body.description,
      subjects: req.body.subjects,
      categories: req.body.categories,
      teacherID: req.user._id
    });

    var assignments = [];
    for (var i in req.body.assignments) {
      var assignment = new AbstractAssignment(req.body.assignments[i]);
      assignment.save();
      assignments.push(assignment);
    }

    newCourse.assignments = assignments;
    newCourse.save(function(err) {
      if (err) {
        logger.error("Couldn't create course: " + newCourse);
        return res.status(400).json({});
      }
      logger.debug('Created course: ' + newCourse);
      return res.status(201).json(newCourse);
    });
  } else {
    logger.error('Only teachers can create courses');
    return res.status(403).end(); // Return 403 forbidden if not a teacher
  }
}

export function update(req, res) {
  AbstractCourse.findById(req.params.id)
    .exec()
    .then(course => {
      if (course) {
        //update these paths
        course.name = req.body.name;
        course.description = req.body.description;
        //save course
        course.save();
        //return an OK status and the course
        logger.debug('Updated course: ' + course);
        return res.status(200).send(course);
      }
    })
    .catch(err => {
      //otherwise return a not found status
      logger.error({ error: err });
      res.send(err);
      return res.status(404).end();
    });
}

export function destroy(req, res) {
  AbstractCourse.findById(req.params.id)
    .exec()
    .then(course => {
      //if course found delete course. Permanently
      course.remove();
      logger.debug('Removed course: ' + course);
      //return a no content status
      return res.status(204).end();
    })
    .catch(err => {
      //return a not found status
      logger.error({ error: err });
      res.send(err);
      return res.status(404).end();
    });
}

//only allow the course teacher or role greater than teacher permission
export function hasPermission(req, course) {
  return new Promise(function(resolve, reject) {
    if (
      shared.userRoles.indexOf(req.user.role) >
        shared.userRoles.indexOf('teacher') ||
      course.teacherID.equals(req.user._id)
    ) {
      resolve();
    } else {
      reject();
    }
  });
}
