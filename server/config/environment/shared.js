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
      name: 'Dr. Daniel Pittman',
      email: 'daniel.pittman@du.edu',
      bio: 'Instructor and Scrum Master',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Evan Hicks',
      email: 'evan.hicks@du.edu',
      bio: 'UI Team Lead Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Wei Cheng',
      email: 'wei.cheng@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Dalton Crutchfield',
      email: 'dalton.crutchfield@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Eitan Dunn',
      email: 'eitan.dunn@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Josh Hoeg',
      email: 'josh.hoeg@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Amy Karlzen',
      email: 'amy.karlzen@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Grant Kochmann',
      email: 'grant.kochmann@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Shivani Punde',
      email: 'shivani.punde@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Jesse Ruder-Hook',
      email: 'jesse.ruder-hook@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Amarinder Singh Sidhu',
      email: 'amarinder.sidhu@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Terese Specker',
      email: 'terese.specker@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Nick Sundermeyer',
      email: 'nicholas.sundermeyer@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Joseph Wainwright',
      email: 'joseph.wainwright@du.edu',
      bio: 'UI Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Justin Martz',
      email: 'justin.martz@du.edu',
      bio: 'Server Team Lead Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Zachary Burmeister',
      email: 'zachary.burmeister@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Madison Eaton',
      email: 'madison.eaton@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Andres Espineira',
      email: 'andres.espineira@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Tresdon Jones',
      email: 'tresdon.jones@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Simao Nziaka',
      email: 'simao.nziaka@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Avery Sand',
      email: 'avery.sand@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Tyler Stanley',
      email: 'paul.stanley@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Michael Stephens',
      email: 'michael.stephens@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Anh Tran',
      email: 'anh.tran@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/path/to/image'
    }, {
      name: 'Peter Valesares',
      email: 'peter.valesares@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }, {
      name: 'Kevin Zheng',
      email: 'kevin.zheng@du.edu',
      bio: 'Server Team Developer',
      image: 'http://www.example.com/route/to/image'
    }
  ],
  description: 'This project was developed as part of Dr. Daniel Pittman\'s Web Development Projects course '
  + 'in Winter Quarter 2018. The goal of the this MVP (minimum viable product) is a rich and responsive '
  + 'web application for Dr. GauthierDickey\'s research into problem creation and generation for educational purposes.'
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
