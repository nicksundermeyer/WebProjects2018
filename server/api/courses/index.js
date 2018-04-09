import {Router} from 'express';

import * as abstractCourseController from './abstractCourses/abstractCourse.controller';
import * as tailoredCourseController from './tailoredCouses/tailoredCourse.controller';

import * as auth from '../../auth/auth.service';

import config from '../../config/environment';

var router = new Router();

//show all courses
router.get('/', abstractCourseController.index);
//get course by id
router.get('/:id', abstractCourseController.show);

// Get tailored assignment
router.get('/:courseid/students/:studentid/assignments/:assignmentid', auth.hasRole('student'), function(req, res) {
  if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('teacher')) {
    tailoredCourseController.getTailoredAssignment(req, res, true);
  } else {
    tailoredCourseController.getTailoredAssignment(req, res, false);
  }
});

// Find Problem
router.get('/:courseid/students/:studentid/assignments/:assignmentid/problems/:problemid', auth.hasRole('student'), tailoredCourseController.getProblem);
// get tailored course with the abstract course id and student id
router.get('/:courseID/students/:studentID', auth.hasRole('student'), function(req, res) {
  if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('teacher')) {
    tailoredCourseController.getTailoredCourse(req, res, true);
  } else {
    tailoredCourseController.getTailoredCourse(req, res, false);
  }
});

//create a course if a teacher
router.post('/', auth.hasRole('teacher'), abstractCourseController.create);
//enroll in a course if student
router.post('/:id/students/:studentID', auth.hasPermissionToEnroll('teacher'), tailoredCourseController.enrollStudentInCourse); // Add Student to course
//delete course if role higher than teacher or teacher who created course
router.delete('/:id', auth.hasPermission('teacher'), abstractCourseController.destroy);
//update course if role higher than teacher or teacher who created course
router.put('/:id', auth.hasPermission('teacher'), abstractCourseController.update);
//submit a solution to a problem
router.post('/:courseId/students/:studentId/assignments/:assignmentId/problems/:problemId',
auth.hasRole('student'), tailoredCourseController.submitSolution);

module.exports = router;
