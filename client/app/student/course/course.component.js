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
  constructor($http, $routeParams, Course) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.courseId = this.$routeParams.id;
    this.isTailored = false;
    this.Course = Course;
  }

  $onInit() {
    this.$http.get('/api/courses/' + this.courseId)
      .then(response => {
        this.course = response.data;
        this.assignments = this.course.assignments;
      });

      this.Course.getStudentInfo()
      .then(response => {
        this.student = response.data;
        console.log(this.student);
      });


    this.$http.get('/api/users/' + this.course.teacherID)
      .then(response => {
        this.teacher = response.data;
      });
  }


  enroll() {
    this.$http.post('/api/courses/' + this.courseId + '/students')
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

