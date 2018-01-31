import {Router} from 'express';
import * as controller from './AbstractCourse.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//show all courses
router.get('/', controller.index);
//get course by id
router.get('/:id', controller.show);
//create a course if a teacher
router.post('/', auth.hasRole('teacher'), controller.create);
//enroll students as a teacher or higher
//router.post('/:id/students', auth.hasRole('teacher'), controller.addStudent);
//get enrollment as a teacher or higher
//router.get('/:id/students', auth.hasRole('teacher'), );
//delete a course if a teacher or higher
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//upsate a course if a teacher
router.put('/:id', auth.hasRole('teacher'), controller.update);

module.exports = router;

//only admin can delete a student
//the teacher who created the course
//or higher 