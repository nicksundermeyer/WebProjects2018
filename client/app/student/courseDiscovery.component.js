import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class CourseDiscoveryController {

  courses = [];
  courseNames = [];

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/courses')
      .then(response => {
        this.courses = response.data;
        this.courses.forEach(course => {
          this.courseNames.push(course.subject);
        });
        console.log(this.courseNames);
      });
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('webProjectsApp.courseDiscovery', [ngRoute])
  .config(routing)
  .component('courseDiscovery', {
    template: require('./courseDiscovery.html'),
    controller: CourseDiscoveryController,
    controllerAs: 'courseDiscoveryController'
  })
  .name;
