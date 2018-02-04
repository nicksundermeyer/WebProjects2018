import {Router} from 'express';
import * as controller from './AbstractCourse.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//show all courses
router.get('/', controller.index);
//get course by id
router.get('/:id', controller.show);
router.get('/mycourses/:id', controller.getTailoredCourse);
router.get('/mycourses/assignments/:id', controller.getAssignment);


//create a course if a teacher
router.post('/', auth.hasRole('teacher'), controller.create);
router.post('/:id/students', auth.hasRole('student'), controller.addStudent); // Add Student to course
router.delete('/:id', auth.hasRole('teacher'), controller.destroy);
router.put('/:id', auth.hasRole('teacher'), controller.update);

module.exports = router;

//only admin can delete a student
//the teacher who created the course
//or higher
