import AbstractCourse from '../abstractCourses/abstractCourse.model';
import TailoredAssignment from '../tailoredCourses/tailoredAssignment.model';
import Submission from '../submission/submission.model';

import mongoose, { Schema } from 'mongoose';

export default function studentDistributionCalculator(req) {
  var courseID = req.params.id;

  return AbstractCourse.findOne({
    _id: mongoose.Types.ObjectId(courseID)
  }).then(function(course) {
    return Submission.find({ courseId: course._id }).then(function(
      submissions
    ) {
      var students = {};
      for (var i in submissions) {
        var sub = submissions[i];

        if (sub.correct) {
          if (sub.studentId in students) {
            students[sub.studentId] += 1;
          } else {
            students[sub.studentId] = 1;
          }
        }
      }

      // Get all assignments for the course
      var assignments = [];
      for (var i = 0; i < course.assignments.length; i++) {
        assignments.push(
          TailoredAssignment.findOne({
            AbstractAssignmentId: course.assignments[i]
          })
        );
      }

      return Promise.all(assignments).then(function(assignments) {
        var totalProblems = 0;
        for (var j = 0; j < assignments.length; j++) {
          totalProblems += assignments[j].problems.length;
        }

        // Calculate Mean
        var sum = 0;
        var count = 0;
        var percentages = [];
        Object.keys(students).forEach(function(key) {
          var numCorrect = students[key];
          var percentage = numCorrect / totalProblems;
          percentages.push(percentage);
          sum = sum + percentage;
          count = count + 1;
        });
        var mean = sum / count;

        //Calculate standard deviation
        var stdSum = 0;
        percentages.forEach(function(percentage) {
          stdSum += Math.pow(percentage - mean, 2);
        });
        var standardDeviation = Math.sqrt(stdSum / count);

        return Promise.resolve({
          description:
            'returns the mean and standard deviation for completion of a course',
          mean: mean,
          stdDev: standardDeviation
        });
      });
    });
  });
}
