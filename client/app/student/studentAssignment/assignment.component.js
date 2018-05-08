import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';
//this class functions as the question UI and manages moving from question to question
export class AssignmentController {
  assignment;
  course;
  selectedProblem;
  problems;
  problemObjects;
  userId;
  problemId;
  isChanged;
  //constructs the course and problems
  /*@ngInject*/
  constructor($routeParams, $scope, Assignment, Course, Auth) {
    this.$routeParams = $routeParams;
    this.Assignment = Assignment;
    this.Course = Course;
    this.Auth = Auth;
    this.problemObjects = [];
    var vm = this;
    localStorage.setItem('ProblemNumber', 0);
    $scope.$watch(() => localStorage.getItem('ProblemNumber'), function(
      newVal
    ) {
      if (newVal) {
        console.log(localStorage.getItem('ProblemNumber'));
        vm.changeProblem(Number(localStorage.getItem('ProblemNumber')));
      }
    });
  }

  $onInit() {
    this.Auth.getCurrentUser()
      .then(user => {
        this.Assignment.getAssignmentInfo(
          this.$routeParams.courseId,
          user._id,
          this.$routeParams.assignmentId
        ).then(response => {
          this.assignment = response.data;
          this.problems = this.assignment.problems;
          var counter = 0;
          this.problems.forEach(problem => {
            let prob = {
              number: counter,
              overview: problem,
              specific: problem.problem
            };
            this.problemObjects.push(prob);
            counter++;
          });
          if (!localStorage.getItem('ProblemNumber')) {
            this.selectedProblem = this.problemObjects[0];
            //localStorage.setItem('ProblemNumber', 0);
          } else {
            this.selectedProblem = this.problemObjects[
              localStorage.getItem('ProblemNumber')
            ];
          }
          this.userId = user._id;
          this.problemId = this.selectedProblem.overview._id;
        });
        //gets the course info for the user
        this.Course.getCourseInfo(this.$routeParams.courseId).then(response => {
          this.course = response.data;
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  //goes to the left problem

  left() {
    if (this.selectedProblem.number > 0) {
      localStorage.setItem(
        'ProblemNumber',
        parseInt(localStorage.getItem('ProblemNumber')) - 1
      );
    }
  }
  //goes to the right problem
  right() {
    if (this.selectedProblem.number < this.problemObjects.length - 1) {
      localStorage.setItem(
        'ProblemNumber',
        parseInt(localStorage.getItem('ProblemNumber')) + 1
      );
    }
  }
  //changes the number of the problem you are on
  changeProblem(problemNumber) {
    console.log(this.problemNumber);
    if (problemNumber > this.problemObjects.length - 1) {
      problemNumber = this.problemObjects.length - 1;
    }
    if (problemNumber < 0) {
      problemNumber = 0;
    }
    this.selectedProblem = this.problemObjects[problemNumber];
    this.problemId = this.selectedProblem.overview._id;
    this.isChanged = true;
    localStorage.setItem('ProblemNumber', problemNumber);
  }

  //Used in css to highlight current selected problem
  isProblem(problemNumber) {
    return this.selectedProblem.number == problemNumber;
  }
}
//this creates the assignment and takes the [ngRoute]
export default angular
  .module('webProjectsApp.assignment', [ngRoute])
  //this gets the config of the route as well as the template, controller, and controllerAs components as well as the name
  .config(routing)
  .component('assignment', {
    template: require('./assignment.html'),
    controller: AssignmentController,
    controllerAs: 'assignmentController'
  }).name;
