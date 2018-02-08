import {Router} from 'express';
import * as controller from './Course.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//show all courses
router.get('/', controller.index);
<<<<<<< HEAD

=======
>>>>>>> upstream/sprint-02
//get course by id
router.get('/:id', controller.show);
//get Tailored course by id
router.get('/mycourses/:id', controller.getTailoredCourse);
<<<<<<< HEAD
//router.get('/mycourses/assignments/:id', controller.getAssignment);

// Find Problem
router.get('/:courseid/students/:studentid/assignments/:assignmentid/problems/:problemid', auth.hasRole('student'), controller.getProblem)
// get students tailored course for that abstract course if enrolled, if not enrolled it should return the abstract course
//router.get('/:courseid/students/:studentid', auth.hasRole('student'), controller.getCourse)

=======
//get assignments by id
router.get('/mycourses/assignments/:id', controller.getAssignment);
>>>>>>> upstream/sprint-02
//create a course if a teacher
router.post('/', auth.hasRole('teacher'), controller.create);
//enroll in a course if student
router.post('/:id/students', auth.hasRole('student'), controller.enrollStudentInCourse); // Add Student to course
//delete course if teacher
router.delete('/:id', auth.hasRole('teacher'), controller.destroy);
//update course if teacher
router.put('/:id', auth.hasRole('teacher'), controller.update);

module.exports = router;

//only admin can delete a student
//the teacher who created the course
//or higher
