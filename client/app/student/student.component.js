import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class StudentController {

  courses = [];
  newCourse = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/courses')
      .then(response => {
        this.courses = response.data;
      });
  }

  addTestCourse() {
    if(this.newCourse) {
      this.$http.post('/api/courses', {
        subject: 'Mathematics',
        maxStudents: 100
      });
      this.newCourse = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
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
