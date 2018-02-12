import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class AssignmentController {

  assignment;
  course;
  selectedProblem;
  problems;

  /*@ngInject*/
  constructor($routeParams, Assignment, Course) {
    this.$routeParams = $routeParams;
    this.Assignment = Assignment;
    this.Course = Course;
  }

  $onInit() {
    this.Assignment.getAssignmentInfo(this.$routeParams.assignmentId)
      .then(response => {
        this.assignment = response.data;
        this.problems = this.assignment.problems;
        this.selectedProblem = this.problems[0].problem;
      });


    this.Course.getCourseInfo(this.$routeParams.courseId)
      .then(response => {
        this.course = response.data;
      });
  }

  changeProblem(problemId) {
    this.selectedProblem = this.problems.filter(prob => prob._id == problemId)[0].problem;
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
