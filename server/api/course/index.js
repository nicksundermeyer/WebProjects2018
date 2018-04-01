import {Router} from 'express';
import * as controller from './course.controller';
import * as auth from '../../auth/auth.service';
import config from '../../config/environment';

var router = new Router();

//show all courses
router.get('/', controller.index);
//get course by id
router.get('/:id', controller.show);

// Get tailored assignment
router.get('/:courseid/students/:studentid/assignments/:assignmentid', auth.hasRole('student'), function(req, res) {
  if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('teacher')) {
    controller.getTailoredAssignment(req, res, true);
  } else {
    controller.getTailoredAssignment(req, res, false);
  }
});

// Find Problem
router.get('/:courseid/students/:studentid/assignments/:assignmentid/problems/:problemid', auth.hasRole('student'), controller.getProblem);
// get tailored course with the abstract course id and student id
router.get('/:courseID/students/:studentID', auth.hasRole('student'), function(req, res) {
  if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('teacher')) {
    controller.getTailoredCourse(req, res, true);
  } else {
    controller.getTailoredCourse(req, res, false);
  }
});

//create a course if a teacher
router.post('/', auth.hasRole('teacher'), controller.create);
//enroll in a course if student
router.post('/:id/students/:studentID', auth.hasPermissionToEnroll('teacher'), controller.enrollStudentInCourse); // Add Student to course
//delete course if role higher than teacher or teacher who created course
router.delete('/:id', auth.hasPermission('teacher'), controller.destroy);
//update course if role higher than teacher or teacher who created course
router.put('/:id', auth.hasPermission('teacher'), controller.update);
//submit a solution to a problem
router.post('/:courseId/students/:studentId/assignments/:assignmentId/problems/:problemId',
auth.hasRole('student'), controller.submitSolution);

module.exports = router;
