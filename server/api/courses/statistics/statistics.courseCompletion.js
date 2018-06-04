'use strict';

import mongoose, { Schema } from 'mongoose';
import shared from './../../../config/environment/shared';
import TailoredCourse from './../tailoredCourses/tailoredCourse.model';
console.log('here in course completion');

module.exports = function failingStudents(req) {
  var o = {};
  o.scope = {
    target: req.params.id
  };
  o.map = function() {
    if (this.abstractCourseID.valueOf() == target) {
      if (this.assignments) {
        this.assignments.forEach(function(assignment) {
          if (assignment.problems) {
            assignment.problems.forEach(function(problem) {
              if (problem.attempts && problem.attempts.length > 0) {
                emit(this.abstractCourseID, { completed: true });
              } else {
                emit(this.abstractCourseID, { completed: false });
              }
            });
          }
        });
      }
    }
  };

  o.reduce = function(k, vals) {
    var totalComplete = 0;
    var totalNonComplete = 0;
    vals.forEach(function(val) {
      if (val.completed) {
        ++totalComplete;
      } else {
        ++totalNonComplete;
      }
    });
    // Calculate the total completion percentage
    var percentage = totalComplete / (totalComplete + totalNonComplete);
    return {
      percentage: percentage,
      numPass: totalComplete,
      numFail: totalNonComplete
    };
  };

  return TailoredCourse.mapReduce(o).then(function(results) {
    console.log(results);
    return results;
  });
};
