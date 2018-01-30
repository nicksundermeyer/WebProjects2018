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
    this.$http.get('/api/courses/' + this.$routeParams.courseId)
      .then(response => {
        this.course = response.data;
        console.log(this.course);
        this.assignment = this.course.assignments.find(asmt => {
          return asmt._id === this.$routeParams.assignmentId;
        });
        this.problems = this.assinment.problems;
        if(this.$routeParams.problemId === null) {
          this.selectedProblem = this.problems[0];
        }
        else {
          this.selectedProblem = this.problems[this.$routeParams.problemId];
        }
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
