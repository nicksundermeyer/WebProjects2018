'use strict';

// Percentage of each course completed
function courseCompletionPercentage(req, res) {
  //calculate values
  return res
    .json({
      average: 2,
      stdDev: 5
    })
    .status(200);
}

// Metrics for student progress on completing courses
function studentDistribution(req, res) {
  //calculate values
  return res
    .json({
      progress: 50
    })
    .status(200);
}

// Set of failing students who are performing below a certain threshold
function failingStudents(req, res) {
  //calculate values
  return res
    .json({
      students: [2, 9, 17]
    })
    .status(200);
}

// Group of exemplar students performing above a certain threshold
function overachievingStudents(req, res) {
  //calculate values
  return res
    .json({
      students: [3, 5, 16]
    })
    .status(200);
}

// Specific problems causing students the most difficulty
function problemSetMetrics(req, res) {
  //calculate values
  return res
    .json({
      problems: [5, 20, 21]
    })
    .status(200);
}

// Category of problems causing students the most difficulty
function categoryMetrics(req, res) {
  //calculate values
  return res
    .json({
      category: 'Optimization'
    })
    .status(200);
}

// Correlations between failure on some problems and success on others (data mining)
function dataCorrelations(req, res) {
  //calculate values
  return res
    .json({
      //unsure
    })
    .status(200);
}
