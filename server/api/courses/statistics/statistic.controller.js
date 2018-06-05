'use strict';

import AbstractCourse from '../abstractCourses/abstractCourse.model';
import failingStudentsCalculator from './statistics.failingStudents';
import studentDistributionCalculator from './statistics.studentDistribution';
import courseCompletionCalculator from './statistics.courseCompletion';
import overachievingStudentsCalculator from './statistics.overachievingStudents';
import problemSetMetricsCalculator from './statistics.problemSetMetrics';
import categoryMetricsCalculator from './statistics.categoryMetrics';
import dataCorrelationsCalculator from './statistics.dataCorrelations';

import mongoose, { Schema } from 'mongoose';
let logger = require('./../../../config/bunyan');

export function myCourses(req, res) {
  return AbstractCourse.find({
    teacherID: mongoose.Types.ObjectId(req.user.id)
  })
    .exec()
    .then(function(results) {
      return res.status(200).json(results);
    });
}

export function getStats(req, res) {
  var courseID = req.params.id;

  var calculations = [];
  calculations.push(courseCompletionCalculator(req));
  calculations.push(failingStudentsCalculator(req));
  calculations.push(studentDistributionCalculator(req));
  calculations.push(overachievingStudentsCalculator(req));
  calculations.push(problemSetMetricsCalculator(req));
  calculations.push(categoryMetricsCalculator(req));
  calculations.push(dataCorrelationsCalculator(req));

  Promise.all(calculations)
    .then(function(results) {
      return res
        .json({
          courseId: courseID,
          courseCompletionPercentage: results[0],
          failingStudents: results[1],
          studentDistribution: results[2],
          overachievingStudents: results[3],
          problemSetMetrics: results[4],
          categoryMetrics: results[5],
          dataCorrelations: results[6]
        })
        .status(200);
    })
    .catch(err => {
      //otherwise return a not found status
      logger.error({ error: err });
      return res
        .status(404)
        .send(err)
        .end();
    });
}
