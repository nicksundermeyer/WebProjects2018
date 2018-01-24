import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './course.routes';

export class CourseController {


  constructor($http, $routeParams, course) {
    assignments = [];
    assignmentsNames = [];
    courses =[];


this.$http=$http;
    this.$routeParams = $routeParams;
    this.course = course;


  }
  $onInit() {
    this.$http.get('/api/courses/' + this.$routeParams.id)
      .then(response => {
        this.course = response.data;
        this.assignment = this.course.assignments.find(asmt => {
          return asmt._id === this.$routeParams.assignmentId;
        });
        this.courses.forEach(course => {
          this.courseNames.push(course.name);
        });
      });
  }

  /*getAssignmentData(){
    this.assignment = this.course.assignments.find(asmt => {
      return asmt._id === this.$routeParams.assignmentId;
    });


  }*/

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('webProjectsApp.course', [ngRoute])
  .config(routing)
  .component('course', {
    template: require('./course.html'),
    controller: CourseController,
    controllerAs: 'courseController',
    bindings: {
      course: '='
    }
  })
  .name;

