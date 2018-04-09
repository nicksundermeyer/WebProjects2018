/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
console.log("seed.js 7");

import User from '../api/users/user.model';
import AbstractCourse from '../api/courses/abstractCourses/abstractCourse.model';
import TailoredCourse from '../api/courses/tailoredCourses/tailoredCourse.model';
import AbstractAssignment from '../api/courses/abstractCourses/abstractAssignment.model';
import TailoredAssignment from '../api/courses/tailoredCourses/tailoredAssignment.model';
import config from './environment/';
import shared from './environment/shared';
import Problem from '../api/courses/problems/problem.model';
import * as problemController from '../api/courses/problems/problem.controller';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    //for every role on shared user roles, create a user for that role.
    for(let role of shared.userRoles) {
      User.find({}).remove()
        .then(() => {
          User.create({
            provider: 'local',
            role,
            name: 'Test ' + role.charAt(0).toUpperCase() + role.slice(1),
            email: role + '@example.com',
            password: 'ps-' + role
          }).then(user => {
            console.log('finished populating users');
            //if user created is a teacher
            //grab the teacher and pass it so that abstracted courses have a teacher id
            if(user.role === 'teacher') {
              createAbstractCourses(user);
              //return the user so that there is no runaway promisse
              return user;
            }
          })
          .catch(err => console.log('error populating users', err));
        });
    }//end creating users

    //populate problems
    for(let i = 0; i < 25; i++) {
      for(let subject of shared.subjects) {
        for(let category of subject.allowedCategories) {
          Problem.find({}).remove()
            .then(() => {
              problemController.create({
                protocol: 'dpg',
                version: '0.1',
                problem: {
                  subject: subject.subject,
                  category,
                  depth: 1
                }
              }).catch(erro => {
                console.log(erro);
              });
            })
            .catch(err => console.log('error populating Problems', err));
        }

        console.log('Finished populating a problem set');
      }//end for of.
    }//end populating problems
  }//end if
}//end fn

function createAbstractCourses(teacher) {
  //create a course with a every combination
  //of categories and subjects
  for(let subject of shared.subjects) {
    //for each specific category for this subject
    //create a course
    for(let category of subject.allowedCategories) {
      AbstractCourse.find({}).remove()
        .then(() => {
          //create the abstract course first then add the created assignment
          AbstractCourse.create({
            name: subject.subject + '-about-' + category,
            description: subject.subject + ' focusing on the ' + category + ' topic',
            subjects: [subject.subject],
            categories: [category],
            teacherID: teacher._id

          }).then(createdCourse =>
            AbstractAssignment.create({
              title: 'Assignment 1',
              description: 'This focuses on ' + category + ' operations',
              minNumProblems: 5,
              maxNumProblems: 10,
              newProblemPercentage: 15
            }).then(newAssignment => {
              createdCourse.assignments.push(newAssignment);
              createdCourse.save();
              console.log('finished populating Abstract Courses');
              return createTailoredCourse(createdCourse);
            })
          )
          .catch(err => console.log('error populating Abstract Courses', err));
        });
    }//end for of.
  }//end seeding Abstract courses.
}//end fn

function addAssignmentsToTailoredCourse(abstractCourse, tailoredCourse) {
  return Problem.find({}).limit(5)
  .exec()
  .then(newProblems => {
    let newTailoredAssignment = {
      AbstractAssignmentId: abstractCourse.assignments[0]._id,
      problems: newProblems
    };

    //create tailored course assignments then add it to the course
    return TailoredAssignment.create(newTailoredAssignment)
    .then(tcAssignment => {
      tailoredCourse.assignments.push(tcAssignment);
      tailoredCourse.save();
      console.log('Tailored course assignment added to the course');
      return tailoredCourse;
    })
    .catch(err => console.log('error creating Tailored Courses assignment', err));
  })
  .catch(err => console.log(err));
}

function createTailoredCourse(abstractCourse) {
  return TailoredCourse.find({}).remove()
    .then(() =>
      TailoredCourse.create({
        abstractCourseID: abstractCourse._id,
        studentID: null,
        subjects: abstractCourse.subjects,
        categories: abstractCourse.categories
      }).then(tc => {
        addAssignmentsToTailoredCourse(abstractCourse, tc);
        return tc;
      })
      .then(() => console.log('finished populating Tailored Courses based on Abstract Courses'))
      .catch(err => console.log('error populating Tailored Courses based on Abstract Courses', err)));
}
