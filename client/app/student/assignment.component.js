import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class AssignmentController {

  assignment;
  course;

  /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.$http.get('/api/courses/' + this.$routeParams.courseId)
      .then(response => {
        this.course = response.data;
        this.assignment = this.course.assignments[this.$routeParams.assignmentId];
        console.log(this.assignment);
      });

  }
}

export default angular.module('webProjectsApp.assignment', [ngRoute])
  .config(routing)
  .component('assignment', {
    template: require('./assignment.html'),
    controller: AssignmentController,
    controllerAs: 'assignmentController'
  })
  .name;
