import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class CourseAbstractController {

  assignments = [];
  course;
  teacher;

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

