import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class StudentController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
  }
}

export default angular.module('webProjectsApp.student', [ngRoute])
  .config(routing)
  .component('student', {
    template: require('./student.html'),
    controller: StudentController,
    controllerAs: 'studentController'
  })
  .name;
