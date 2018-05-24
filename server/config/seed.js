/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/users/user.model';

import AbstractCourse from '../api/courses/abstractCourses/abstractCourse.model';
import TailoredCourse from '../api/courses/tailoredCourses/tailoredCourse.model';
import Submission from '../api/courses/submission/submission.model';

import AbstractAssignment from '../api/courses/abstractCourses/abstractAssignment.model';

import TailoredAssignment from '../api/courses/tailoredCourses/tailoredAssignment.model';

import config from './environment/';

import shared from './environment/shared';

import Problem from '../api/courses/problems/problem.model';

import * as problemController from '../api/courses/problems/problem.controller';
import * as tailoredCourseController from '../api/courses/tailoredCourses/tailoredCourse.controller';

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    console.log('Seeding database...');
    //for every role on shared user roles, create a user for that role.
    for (let role of shared.userRoles) {
      User.find({})
        .remove()
        .then(() => {
          User.create({
            provider: 'local',
            role,
            name: 'Test ' + role.charAt(0).toUpperCase() + role.slice(1),
            email: role + '@example.com',
            password: 'ps-' + role
          })
            .then(user => {
              //if user created is a teacher
              //grab the teacher and pass it so that abstracted courses have a teacher id
              if (user.role === 'teacher') {
                createAbstractCourses(user);
                createMockSubmissions();
                //return the user so that there is no runaway promisse
                return user;
              }
            })
            .catch(err => console.log('error populating users', err));
        });
    } //end creating users

    //populate problems
    for (let i = 0; i < 25; i++) {
      for (let subject of shared.subjects) {
        for (let category of subject.allowedCategories) {
          Problem.find({})
            .remove()
            .then(() => {
              problemController
                .create({
                  protocol: 'dpg',
                  version: '0.1',
                  problem: {
                    subject: subject.subject,
                    category,
                    depth: 1
                  }
                })
                .catch(erro => {
                  console.log(erro);
                });
            })
            .catch(err => console.log('error populating Problems', err));
        }
      } //end for of.
    } //end populating problems
  } //end if
} //end fn

function createAbstractCourses(teacher) {
  //create a course with a every combination
  //of categories and subjects
  for (let subject of shared.subjects) {
    //for each specific category for this subject
    //create a course
    for (let category of subject.allowedCategories) {
      AbstractCourse.find({})
        .remove()
        .then(() => {
          //create the abstract course first then add the created assignment
          AbstractCourse.create({
            name: subject.subject + '-about-' + category,
            description:
              subject.subject + ' focusing on the ' + category + ' topic',
            subjects: [subject.subject],
            categories: [category],
            teacherID: teacher._id
          })
            .then(createdCourse =>
              AbstractAssignment.create({
                title: 'Assignment 1',
                description: 'This focuses on ' + category + ' operations',
                minNumProblems: 5,
                maxNumProblems: 10,
                newProblemPercentage: 15
              }).then(newAssignment => {
                createdCourse.assignments.push(newAssignment);
                createdCourse.save();
                return createTailoredCourse(createdCourse);
              })
            )
            .catch(err =>
              console.log('error populating Abstract Courses', err)
            );
        });
    } //end for of.
  } //end seeding Abstract courses.
} //end fn

function addAssignmentsToTailoredCourse(abstractCourse, tailoredCourse) {
  return Problem.find({})
    .limit(5)
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
          //
          //console.log('Tailored course assignment added to the course');
          return tailoredCourse;
        })
        .catch(err =>
          console.log('error creating Tailored Courses assignment', err)
        );
    })
    .catch(err => console.log(err));
}

function createTailoredCourse(abstractCourse) {
  return TailoredCourse.find({})
    .remove()
    .then(() =>
      TailoredCourse.create({
        abstractCourseID: abstractCourse._id,
        studentID: null,
        subjects: abstractCourse.subjects,
        categories: abstractCourse.categories
      })
        .then(tc => {
          addAssignmentsToTailoredCourse(abstractCourse, tc);
          return tc;
        })

        .catch(err =>
          console.log(
            'ERROR: error populating Tailored Courses based on Abstract Courses',
            err
          )
        )
    );
} //end create Tailored Course

// A function to create some submissions to use to calculate statistics
function createMockSubmissions() {
  // Create a new teacher to create the course under. Unfortunately can't use the e
  User.findOne({ role: 'teacher', email: 'teacher@example.com' })
    .exec()
    .then(function(teacher) {
      // Create a new course to use for the statistics calculations
      var statsCourse = new AbstractCourse({
        name: 'Statistics Test',
        description:
          'A course with known distributions for calculating statistics',
        subjects: 'algebra',
        categories: 'addition',
        teacherID: teacher._id
      });

      // Create one assignment with 10 problems.
      var assignment = new AbstractAssignment({
        title: 'Sample Assignment for Statistics',
        description:
          'An assignment to have the students submit problems against.',
        minNumProblems: 10,
        maxNumProblems: 10,
        newProblemPercentage: 0
      });

      statsCourse.assignments = [assignment];

      const NUM_STUDENTS = 20;
      const NUM_PROBLEMS = 10;

      //Save the course and assignment and then create submissions
      statsCourse.save().then(function(course) {
        assignment.save().then(function(assignment) {
          // Create students to submit problems for the assignment.
          for (var i = 0; i < NUM_STUDENTS; i++) {
            var student = new User({
              role: 'student',
              email: 'test_student_' + i + '@example.com',
              password: 'ps-student'
            });

            student.save().then(function(student) {
              /* TODO: Here we need to introduce some variance in the way these submissions are created.
            *  - Some students should not submit for certain problems (percentage complete being known)
            *  - Some students should get some questions wrong (percentage wrong being known) */

              // "Roll a dice" and compare to these numbers to introduce variance.
              const PERCENTAGE_ATTEMPTED = 0.3;
              const PERCENTAGE_CORRECT = 0.8;

              for (var prob = 0; prob < NUM_PROBLEMS; prob++) {
                var submission = new Submission({
                  studentId: student._id,
                  problemId: null, // We can use no problem ID here to just roll up by course
                  assignmentId: assignment._id,
                  courseId: course._id,
                  attemptNum: 1,
                  correct: true
                });

                submission.save();
              }
            });
          }
        });
      });
    });
}
