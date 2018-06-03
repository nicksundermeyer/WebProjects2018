'use strict';

import AbstractCourse from '../abstractCourses/abstractCourse.model';
import failingStudentsCalculator from './statistics.failingStudents';
import studentDistributionCalculator from './statistics.studentDistribution';
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
  var calculations = [];
  calculations.push(failingStudentsCalculator(req));
  calculations.push(studentDistributionCalculator(req));
  Promise.all(calculations)
    .then(function(results) {
      return res
        .json({
          courseId: 12345,
          courseName: 'test course 1',
          courseCompletionPercentage: {
            average: 1,
            stdDev: 1
          },
          studentDistribution: results[1],
          failingStudents: results[0],
          overachievingStudents: {
            average: 4,
            stdDev: 4
          },
          problemSetMetrics: {
            average: 5,
            stdDev: 5
          },
          categoryMetrics: {
            average: 6,
            stdDev: 6
          },
          dataCorrelations: {
            average: 7,
            stdDev: 7
          }
        })
        .status(200);
    })
    .catch(err => {
      //otherwise return a not found status
      logger.error({ error: err });
      return res
        .status(400)
        .send(err)
        .end();
    });
}

// Percentage of each course completed
export function courseCompletionPercentage(req, res) {
  //calculate values
  return res
    .json({
      average: 2,
      stdDev: 5
    })
    .status(200);
}

// Metrics for student progress on completing courses
export function studentDistribution(req, res) {
  //calculate values
  return res
    .json({
      progress: 50
    })
    .status(200);
}

// Group of exemplar students performing above a certain threshold
export function overachievingStudents(req, res) {
  //calculate values
  return res
    .json({
      students: [3, 5, 16]
    })
    .status(200);
}

// Specific problems causing students the most difficulty
export function problemSetMetrics(req, res) {
  //calculate values
  return res
    .json({
      problems: [5, 20, 21]
    })
    .status(200);
}

// Category of problems causing students the most difficulty
export function categoryMetrics(req, res) {
  //calculate values
  return res
    .json({
      category: 'Optimization'
    })
    .status(200);
}

// Correlations between failure on some problems and success on others (data mining)
export function dataCorrelations(req, res) {
  //calculate values
  return res
    .json({
      //unsure
    })
    .status(200);
}
