import {Router} from 'express';
import * as controller from './Course.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//show all courses
router.get('/', controller.index);
//get course by id
router.get('/:id', controller.show);
//get Tailored course by id
router.get('/mycourses/:id', controller.getTailoredCourse);
//get assignments by id
router.get('/mycourses/assignments/:id', controller.getAssignment);
//create a course if a teacher
router.post('/', auth.hasRole('teacher'), controller.create);
//enroll in a course if student
router.post('/:id/students', auth.hasRole('student'), controller.enrollStudentInCourse); // Add Student to course
//delete course if role higher than teacher or teacher who created course
router.delete('/:id', auth.hasPermission('teacher'), controller.destroy);
//update course if role higher than teacher or teacher who created course
router.put('/:id', auth.hasPermission('teacher'), controller.update);

module.exports = router;
