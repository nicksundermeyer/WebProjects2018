'use strict';

import mongoose, { Schema } from 'mongoose';
import shared from './../../../config/environment/shared';
import TailoredCourse from './../tailoredCourses/tailoredCourse.model';
import AbstractCourse from '../abstractCourses/abstractCourse.model';
import TailoredAssignment from '../tailoredCourses/tailoredAssignment.model';
console.log('here in course completion');

module.exports = function failingStudents(req) {
  return AbstractCourse.find({
    _id: mongoose.Types.ObjectId(req.params.id)
  }).then(function(course) {
    var o = {};
    o.scope = {
      target: req.params.id,
      abstractAssignments: course[0].assignments
    };
    o.map = function() {
      var numCompleted = 0;
      var numNotCompleted = 0;
      var inCourse = false;
      for (var i = 0; i < abstractAssignments.length; i++) {
        if (this.AbstractAssignmentId.valueOf() == abstractAssignments[i]) {
          inCourse = true;
        }
      }

      if (inCourse) {
        if (this.problems) {
          this.problems.forEach(function(problem) {
            if (problem.attempts && problem.attempts.length > 0) {
              ++numCompleted;
            } else {
              ++numNotCompleted;
            }
          });
        }

        emit(target, { numCompleted, numNotCompleted });
      }
    };

    o.reduce = function(k, vals) {
      var totalCompleted = 0;
      var totalNotCompleted = 0;
      vals.forEach(function(val) {
        totalCompleted += val.numCompleted;
        totalNotCompleted += val.numNotCompleted;
      });
      // Calculate their overall grade
      var percentage = totalCompleted / (totalCompleted + totalNotCompleted);
      return {
        percentage: percentage,
        totalCompleted: totalCompleted,
        totalNotCompleted: totalNotCompleted
      };
    };

    return TailoredAssignment.mapReduce(o).then(function(results) {
      console.log(results);
      return results;
    });
  });
};
