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
  constructor($http, $routeParams, Course, Auth) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.courseId = this.$routeParams.id;
    this.isTailored = false;
    this.Course = Course;
    this.Auth = Auth;
  }

  $onInit() {
    this.Auth.getCurrentUser()
      .then(student => {
        this.student = student;
        return this.Course.getTailoredCourseInfo(this.courseId, this.student._id);
      })
      .then(tailored => {
        this.isTailored = true;
        this.course = tailored.data;
        this.assignments = this.course.assignments;
        if(!this.course) {
          this.Course.getCourseInfo(this.courseId)
            .then(abstract => {
              this.isTailored = false;
              this.course = abstract.data;
              this.assignments = this.course.assignments;
            });
        }
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

