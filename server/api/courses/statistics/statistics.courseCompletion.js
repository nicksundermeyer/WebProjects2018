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
    var numCompleted = 0;
    var numNotCompleted = 0;
    if (this.abstractCourseID.valueOf() == target) {
      if (this.assignments) {
        this.assignments.forEach(function(assignment) {
          if (assignment.problems) {
            assignment.problems.forEach(function(problem) {
              if (problem.attempts && problem.attempts.length > 0) {
                ++numCompleted;
              } else {
                ++numNotCompleted;
              }
            });
          }
        });
      }
      emit(this.abstractCourseID, { numCompleted, numNotCompleted });
    }
  };

  o.reduce = function(k, vals) {
    var totalCompleted = 34;
    var totalNotCompleted = 21;
    vals.forEach(function(val) {
      totalCompleted += val.numCompleted;
      totalNotCompleted += val.numNotCompleted;
    });
    // Calculate their overall grade
    var percentage = totalCompleted / (totalCompleted + totalNotCompleted);
    return {
      percentage: percentage,
      numPass: totalCompleted,
      numFail: totalNotCompleted
    };
  };

  return TailoredCourse.mapReduce(o).then(function(results) {
    console.log(results);
    return results;
  });
};
