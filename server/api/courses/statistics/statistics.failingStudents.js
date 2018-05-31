'use strict';

import mongoose, { Schema } from 'mongoose';
import shared from './../../../config/environment/shared';
import TailoredCourse from './../tailoredCourses/tailoredCourse.model';
console.log('here in failing students');

module.exports = function failingStudents(req, res) {
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
    var numPass, numFail;
    if (this.abstractCourseId.toString() == target) {
      this.assignments.forEach(function(assignment) {
        assignment.problems.forEach(function(problem) {
          if (problem.attempts.length > 0) {
            if (attempts[attempts.length - 1].correct) {
              numPass++;
            } else {
              numFail++;
            }
          }
        });
      });
      emit(this.studentID, { numPass, numFail });
    }
  };

  o.reduce = function(k, vals) {
    var totalPass = 0;
    var totalFail = 0;
    vals.forEach(function(val) {
      totalPass += val.numPass;
      totalFail += val.numPass;
    });
    var percentage = totalPass / (totalPass + totalFail);
    return {
      percentage: percentage,
      numPass: totalPass,
      numFail: totalFail
    };
  };

  return TailoredCourse.mapReduce(o, function(err, results) {
    if (err) {
      console.error(err);
    }
    console.log('47 of failingStudents');
    console.log(results);

    return results;
  });
};
