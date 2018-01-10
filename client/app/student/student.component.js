import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class StudentController {

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('webProjectsApp.main', [ngRoute])
  .config(routing)
  .component('student', {
    template: require('./student.html'),
    controller: StudentController
  })
  .name;
