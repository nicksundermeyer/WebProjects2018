import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class CourseController {

  assignments = [];
  course;

  /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.$http.get('/api/courses/' + this.$routeParams.id)
      .then(response => {
        this.course = response.data;
        this.assignments = this.course.assignments;
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

