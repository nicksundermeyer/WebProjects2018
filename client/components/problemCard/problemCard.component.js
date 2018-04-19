'use strict';

import angular from 'angular';
import 'mathlex_server_friendly';
//import mathlex from 'mathlex_server_friendly';
import katex from 'katex';
//import kas from 'kas/kas';

export class ProblemCardComponent {

  userInput;
  ast;
  latex;
  descriptionLatex;
  attIsCorrect;
  problem;
  remainingAttempts;

  /*@ngInject*/
  constructor($location, $scope, $uibModal, Assignment, $routeParams) {
    'ngInject';
    this.$location = $location;
    this.userInput = '';
    this.ast = '';
    this.latex = '';
    this.$uibModal = $uibModal;
    var vm = this;
    this.basic_operators_isClicked = false;
    this.constants_isClicked = false;
    this.logical_isClicked = false;
    this.Assignment = Assignment;
    this.$routeParams = $routeParams;
    this.attIsCorrect = false;
    this.alerts = [];

    /*$watch is checking if newVal is true then load virtual machine */
    $scope.$watch(() => this.myproblemgeneral, function(newVal) {
      if(newVal) {
        vm.load();
      }
    });

    $scope.$watch(() => this.myproblemspecifc, function(newVal) {
      if(newVal) {
        vm.load();
      }
    });
  }

  click(name) {
    if(this[name]) {
      this[name] = false;
    } else {
      this[name] = true;
    }
  }

  load() {
    if(this.ischanged === true) {
      this.userInput = '';
      this.updateDisplay();
      this.ischanged = false;
    }
    this.descriptionLatex = MathLex.render(this.myproblemspecific.description.math, 'latex');
    katex.render(this.descriptionLatex, document.getElementById('problemDisplay-problem'));
    this.remainingAttempts = this.myproblemgeneral.numberOfAllowedAttempts - this.myproblemgeneral.attempts.length;
    console.log(this.remainingAttempts);
  }

  /*Try and Catch to see if parsing and rendering works ok*/
  updateDisplay() {
    try {
      this.ast = MathLex.parse(this.userInput);
      this.latex = MathLex.render(this.ast, 'latex');
      var str_version = this.latex.toString();  //cast to string to ensure katex can parse it
      katex.render(str_version, document.getElementById('problem-input'));
      document.getElementById('text-box-problem').style.color = 'black';
    } catch(e) {
      document.getElementById('text-box-problem').style.color = 'blue';
    }
  }

  submitSolution() {
    if(document.getElementById('text-box-problem').style.color == 'blue' || document.getElementById('text-box-problem').style.length === 0) {
      this.$uibModal.open({
        template: require('../problemConfirmationModal/problemConfirmationModal.html'),
        controller: 'problemConfirmationModalController as problemConfirmationModalController',
      }).result.then(() => {
        this.Assignment.submitSolution(this.$routeParams.courseId, this.myuserid, this.$routeParams.assignmentId,
          this.myproblemid, this.latex);
      }, () => {
        console.log('Cancelled');
      });
    } else {
      this.Assignment.submitSolution(this.$routeParams.courseId, this.myuserid, this.$routeParams.assignmentId,
          this.myproblemid, this.latex)
          .async()
          .then((res) => {
            if(res.data.result === 'success') {
              document.getElementById('text-box-problem').style.color = 'green';
              this.addAlert('success', 'Correct!');
            } else {
              document.getElementById('text-box-problem').style.color = 'red';
              this.addAlert('danger', 'Incorrect!');
            }
          });
    }
  }

  attemptInfo(){
    this.remainingAttempts = this.myproblemgeneral.numberOfAllowedAttempts - this.myproblemgeneral.attempts.length;
  }

  mappings = {
    sqrt: [
      '*sqrt(x)',
      'sqrt(x)'
    ],
    plus: [
      'x+y'
    ],
    mult: [
      '*x'
    ],
    div: [
      '/x'
    ],
    equals: [
      '= x'
    ],
    greater: [
      '> x'
    ],
    less: [
      '< x'
    ],
    pi: [
      'pi'
    ],
    e: [
      'e'
    ],
    infinity: [
      'infinity'
    ],
    i: [
      'i'
    ],
    zeta: [
      '#Z'
    ],
    tau: [
      '#tau'
    ],
    rightarrow: [
      '-> x'
    ],
    leftarrow: [
      '<- x'
    ],
    forall: [
      'forall x -> x'
    ],
    exists: [
      'exists x : x'
    ]

  }

  append(htmlVal) {
    console.log('test');
    if(htmlVal) {
      this.userInput += this.mappings[htmlVal][0];
    } else {
      if(this.mappings[htmlVal].length > 1) {
        this.userInput += this.mappings[htmlVal][1];
      } else {
        this.userInput += this.mappings[htmlVal][0];
      }
    }
    this.updateDisplay();
  }

  addAlert(type, msg) {
    console.log('added alert');
    this.alerts.push({type: type, msg: msg});
  }

  closeAlert(index) {
    console.log('closed alert');
    this.alerts.splice(index, 1);
  }
}

export default angular.module('directives.problemCard', [])
  .component('problemCard', {
    template: require('./problemCard.html'),
    controller: ProblemCardComponent,
    controllerAs: 'problemCardController',
    bindings: {
      myproblemgeneral: '=',
      myproblemspecific: '=',
      myuserid: '=',
      myproblemid: '=',
      ischanged: '='
    }
  })
  .name;
