import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class AssignmentController {

  assignment;
  course;
  selectedProblem;
  problems;

  /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.$http.get('/api/courses/mycourses/assignments/' + this.$routeParams.assignmentId)
      .then(response => {
        this.assignment = response.data;
        this.problems = this.assignment.problems;
        if(this.$routeParams.problemId == null) {
          this.selectedProblem = this.problems[0].problem;
        }
        else {
          this.selectedProblem = this.problems.filter(prob => prob._id == this.$routeParams.problemId)[0].problem;
        }
      });


    this.$http.get('/api/courses/' + this.$routeParams.courseId)
      .then(response => {
        this.course = response.data;
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
