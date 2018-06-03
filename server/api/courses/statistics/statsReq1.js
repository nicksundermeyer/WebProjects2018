'use strict';

import AbstractCourse from '../abstractCourses/abstractCourse.model';
import TailoredCourse from '../tailoredCourses/tailoredCourse.model';
import Problem from '../problems/problem.model';

export function courseCompletion(req, res) {
  var c = {};
  c.scope = {
    target: req.params.courseId
  };

  c.map = function() {
    this.assignments;
    {
      assignments.problems;
      {
        if (problems.attempts.length == 0) {
          emit({ courseId }, { completed: false });
          return;
        }
      }
      emit({ courseId }, { completed: true });
    }
  };

  // REDUCE:

  c.reduce = function(k, values) {
    var numCompleted, numNonCompleted;
    values.forEach(function(current) {
      if ('completed' in current) {
        if (current.completed) {
          numCompleted++;
        } else {
          numNonCompleted++;
        }
      } else {
        numCompleted += current.numCompleted;
        numNonCompleted += current.numNonCompleted;
      }
    });

    return {
      numCompleted,
      completetionPercentage: numCompleted / (numCompleted + numNotCompleted),
      numNonCompleted,
      nonCompletionPercentage:
        numNonCompleted / (numCompleted + numNotCompleted)
    };
  };

  TailoredCourse.mapReduce(c, function(err, results) {
    if (err) {
      console.error(err);
    }
    console.log(results.results);
  });
}
