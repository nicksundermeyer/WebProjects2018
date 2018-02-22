'use strict';

// https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
function arrayUnique(array) {
  var a = array.concat();
  for(var i = 0; i < a.length; ++i) {
    for(var j = i + 1; j < a.length; ++j) {
      if(a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }

  return a;
}

var subjects = [{
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

var allCategories = [];
var allSubjects = [];

//for each subjects save all of its categories to one array.
subjects.forEach(function(subject) {
  allCategories.concat(subject.allowedCategories);
  allSubjects.push(subject.subject);
});

//eliminate duplicates
allCategories = arrayUnique(allCategories);

var aboutData = {
  contributors: [
    {
      name: 'Evan Hicks',
      email: 'evan.hicks@du.edu',
      bio: 'Evan was the lead developer on the UI side of the project.',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Josh Hoeg',
      email: 'josh.hoeg@du.edu',
      bio: 'Josh was another lead developer on the UI team for this project.',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Joseph Wainwright',
      email: 'joseph.wainwright@du.edu',
      bio: 'This is a biography about Joseph, one of the developers on the UI Team.',
      image: 'http://www.example.com/path/to/image'
    }
  ],
  description: 'This project was developed as part of Dr. Daniel Pittman\'s Web Development Projects course in Winter Quarter 2018. The goal of the this MVP (minimum viable product) is a rich and responsive web application for Dr. GauthierDickey\'s research into problem creation and generation for educational purposes.'
};

exports = module.exports = {
  problemEngineUrl: 'https://problem-engine.herokuapp.com/problems',
  // List of user roles
  userRoles: ['guest', 'user', 'student', 'teacher', 'researcher', 'admin'],
  subjects: subjects,
  allCategories: allCategories,
  allSubjects: allSubjects,
  aboutData: aboutData
};
