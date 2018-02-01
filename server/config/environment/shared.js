'use strict';

let subjects = [{
  subject: 'booleanLogic',
  allowedCategories: [
    'or',
    'and',
    'not',
    'implication'
  ]
}, {
  subject: 'algebra',
  allowedCategories: [
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'linearEquations',
    'quadraticEquations'
  ]
}];

let _allCategories = [];
let _allSubjects = [];

//for each subject grab all the categories
//and all the subjects
subjects.forEach(function (subject) {
  _allCategories.concat(subject.allowedCategories);
  allSubjects.push(subject.subject);
});

//create a set of all the categories to avoid duplicates
let allCategories = new Set([..._allCategories]);

exports = module.exports = {
  problemEngineUrl: 'https://problem-engine.herokuapp.com/problems',
  // List of user roles
  userRoles: ['guest', 'user', 'student', 'teacher', 'researcher', 'admin'],

  subjects: subjects,
  allCategories: allCategories,
  allSubjects: allSubjects
};

/*
// https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
function arrayUnique(array) {
  var a = array.concat();
  for(var i = 0; i < a.length; ++i) {
    for(var j = i + 1; j < a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
}

*/