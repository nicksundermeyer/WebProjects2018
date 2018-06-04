'use strict';

import mongoose, { Schema } from 'mongoose';
import shared from './../../../config/environment/shared';
import TailoredCourse from './../tailoredCourses/tailoredCourse.model';
console.log('here in failing students');

module.exports = function failingStudents(req) {
  //
  //
  //map
  //go through students
  //if a student: in the course, and failing
  //emit students name and grade

  //calculating failing:
  //

  // start with asbtract course,
  //     go through every associated tailored course
  //         calculate grade
  //             if
  //
  //
  //           look at all tailored courses, only look at ones
  //           take lates attempt
  //
  //           map: emit student id and multiple values for them
  //               one per problem, binary pass fail
  var o = {};
  o.scope = {
    target: req.params.id
  };
  o.map = function() {
    var numFail = 0;
    var numPass = 0;
    if (this.abstractCourseID.valueOf() == target) {
      if (this.assignments) {
        this.assignments.forEach(function(assignment) {
          if (assignment.problems) {
            assignment.problems.forEach(function(problem) {
              if (problem.attempts && problem.attempts.length > 0) {
                if (problem.attempts[problem.attempts.length - 1].correct) {
                  numPass++;
                } else {
                  numFail++;
                }
              }
            });
          }
        });
      }
      emit(this.studentID, { numPass, numFail });
    }
  };

  o.reduce = function(k, vals) {
    var totalPass = 0;
    var totalFail = 0;
    vals.forEach(function(val) {
      totalPass += val.numPass;
      totalFail += val.numFail;
    });
    // Calculate their overall grade
    var percentage = totalPass / (totalPass + totalFail);
    return {
      percentage: percentage,
      numPass: totalPass,
      numFail: totalFail
    };
  };

  return TailoredCourse.mapReduce(o).then(function(results) {
    console.log(results);
    return results;
  });
};
