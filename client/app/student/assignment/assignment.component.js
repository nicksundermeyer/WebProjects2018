import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class AssignmentController {

  assignment;
  course;
  selectedProblemOverview;
  selectedProblemSpecific;
  problems;
  userId;
  problemId;
  isChanged;

  /*@ngInject*/
  constructor($routeParams, Assignment, Course, Auth) {
    this.$routeParams = $routeParams;
    this.Assignment = Assignment;
    this.Course = Course;
    this.Auth = Auth;
  }

  $onInit() {
    this.Auth.getCurrentUser()
      .then(user => {
        this.Assignment.getAssignmentInfo(this.$routeParams.courseId, user._id, this.$routeParams.assignmentId)
          .then(response => {
            this.assignment = response.data;
            this.problems = this.assignment.problems;
            this.selectedProblemOverview = this.problems[0];
            this.selectedProblemSpecific = this.problems[0].problem;
            //console.log(this.problems[0]);
            this.userId = user._id;
            this.problemId = this.selectedProblemOverview._id;
            // console.log(this.selectedProblemOverview);
            // console.log(this.selectedProblemSpecific);
          });
        this.Course.getCourseInfo(this.$routeParams.courseId)
          .then(response => {
            this.course = response.data;
          });
      })
      .catch(err => {
        console.error(err);
      });
  }
  changeProblem(problemId) {
    this.selectedProblemOverview = this.problems.filter(prob => prob._id == problemId)[0];
    this.selectedProblemSpecific = this.problems.filter(prob => prob._id == problemId)[0].problem;
    this.problemId = this.selectedProblemOverview._id;
    this.isChanged = true;
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
