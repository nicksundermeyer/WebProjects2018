import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class CourseController {

  assignments = [];
  course;
  courseId;
  teacher;
  isTailored;
  student;

  /*@ngInject*/
  constructor($http, $routeParams, Course, UserServ) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.courseId = this.$routeParams.id;
    this.isTailored = false;
    this.Course = Course;
    this.UserServ = UserServ;
  }

  $onInit() {

    this.Course.getCourseInfo(this.courseId)
      .then(response => {
        this.course = response.data;
        this.assignments = this.course.assignments;
      });

      this.Course.getStudentInfo()
      .then(response => {
        this.student = response.data;
      });


    this.$http.get('/api/users/' + this.course.teacherID)
      .then(response => {
        this.teacher = response.data;
      });
  }


  enroll() {
    this.Course.enrollStudentCourse(this.courseId)
      .then(response => {
        this.course = response.data;
        this.assignments = this.course.assignments;
        this.isTailored = true;
      });
  }

}

export default angular.module('webProjectsApp.course', [ngRoute])
  .config(routing)
  .component('course', {
    template: require('./course.html'),
    controller: CourseController,
    controllerAs: 'courseController',
  })
  .name;

