/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import AbstractCourse from '../api/course/AbstractCourse.model';
import TailoredCourse from '../api/course/TailoredCourse.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
          + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
          + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
          + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
          + 'tests alongside code. Automatic injection of scripts and '
          + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
          + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
          + 'payload, minifies your scripts/css/images, and rewrites asset '
          + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
          + 'and openshift subgenerators'
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          role: 'user',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        }, {
          provider: 'local',
          name: 'Test Student',
          email: 'student@example.com',
          password: 'student'
        }, {
          provider: 'local',
          role: 'teacher',
          name: 'Test Teacher',
          email: 'teacher@example.com',
          password: 'teacher'
        }, {
          provider: 'local',
          role: 'teacher',
          name: 'Second Teacher',
          email: 'teacher2@example.com',
          password: 'teacher'
        })
          .then(() => console.log('finished populating users'))
          .catch(err => console.log('error populating users', err));
      });
      AbstractCourse.find({}).remove()
      .then(() => {
        AbstractCourse.create({
          name: 'Biology',
          description: `Biology is about the body? I just know people say men
          and women are different because of their biology. Dont kno wat dat means.`,
          maxStudents: 30,
          assignments: [{
            minNumProblems: 2,
            maxNumProblems: 12,
            newProblemPercentage: 15
          }]
        }, {
          name: 'Algebra',
          description: 'Algebra is worth studying? I guess.',
          maxStudents: 50,
          assignments: [{
            minNumProblems: 5,
            maxNumProblems: 20,
            newProblemPercentage: 25
          }]
        }, {
          name: 'Chemistry',
          description: 'Chemistry is cool! cause METH.',
          maxStudents: 25,
          assignments: [{
            minNumProblems: 2,
            maxNumProblems: 12,
            newProblemPercentage: 15
          }]
        })
          .then(() => console.log('finished populating AbstractCourses'))
          .catch(err => console.log('error populating AbstractCourses', err));
      });

      TailoredCourse.find({}).remove()
      .then(() => {
        TailoredCourse.create({
          name: 'Biology',
          description: `Biology is about the body? I just know people say men
          and women are different because of their biology. Dont kno wat dat means.`,
          assignments: [{
            minNumProblems: 2,
            maxNumProblems: 12,
            newProblemPercentage: 15,
            problems: [{
              problem: {
                subject: 'Biology',
                category: 'bio stuff',
                description: [
                  "+",
                  [
                    "var",
                    "99"
                  ],
                  1
                ],
                solution: [
                  "=",
                  [
                    "var",
                    "66"
                  ],
                  -1
                ]
              }
            }]//end problem
          }]//end assignment
        }, {
          name: 'Algebra',
          description: 'Algebra is worth studying? I guess.',
          assignments: [{
            minNumProblems: 5,
            maxNumProblems: 20,
            newProblemPercentage: 25,
            problems: [{
              problem: {
                subject: 'Algebra',
                category: 'algebra stuff',
                description: [
                  "+",
                  [
                    "var",
                    "39"
                  ],
                  1
                ],
                solution: [
                  "=",
                  [
                    "var",
                    "30"
                  ],
                  -1
                ]
              }
            }]//end problem
          }]//end assignment
        }, {
          name: 'Chemistry',
          description: 'Chemistry is cool! cause METH.',
          assignments: [{
            minNumProblems: 2,
            maxNumProblems: 12,
            newProblemPercentage: 15,
            problems: [{
              problem: {
                subject: 'Chemistry',
                category: 'chem stuff',
                description: [
                  "+",
                  [
                    "var",
                    "H2"
                  ],
                  1
                ],
                solution: [
                  "=",
                  [
                    "var",
                    "O"
                  ],
                  -1
                ]
              }
            }]//end problem
          }]//end assignment
        })
          .then(() => console.log('finished populating TailoredCourses'))
          .catch(err => console.log('error populating TailoredCourses', err));
      });
  }
}
