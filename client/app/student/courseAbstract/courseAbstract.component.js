import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class CourseAbstractController {

  assignments = [];
  course;
  courseId;
  teacher;

  /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.courseId = this.$routeParams.id;
  }

  $onInit() {
    this.$http.get('/api/courses/' + this.$routeParams.id)
      .then(response => {
        this.course = response.data;
        this.assignments = this.course.assignments;
      });
    this.$http.get('/api/users/' + this.course.teacherID)
      .then(response => {
        this.teacher = response.data;
      });
  }


  enroll() {
    this.$http.post('/api/courses/' + this.courseId + '/students')
      .then(response => {
        //reset course to returned tailored course
        this.course = response.data;
        console.log(this.course);
      });
  }

}

export default angular.module('webProjectsApp.courseAbstract', [ngRoute])
  .config(routing)
  .component('courseAbstract', {
    template: require('./courseAbstract.html'),
    controller: CourseAbstractController,
    controllerAs: 'courseAbstractController',
  })
  .name;

