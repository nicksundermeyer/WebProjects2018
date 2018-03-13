'use strict';

import angular from 'angular';
import 'mathlex_server_friendly';
//import mathlex from 'mathlex_server_friendly';
import katex from 'katex';
import kas from 'kas/kas';

export class ProblemCardComponent {

  userInput;
  ast;
  latex;
  descriptionLatex;
  attIsCorrect;

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
    console.log(this.myproblemspecific.description.math);
    var tree2 = MathLex.parse('2+2');
    console.log(tree2);
    this.descriptionLatex = MathLex.render(this.myproblemspecific.description.math, 'latex');
    katex.render(this.descriptionLatex, document.getElementById('problemDisplay-problem'));
  }

  updateDisplay() {
    console.log(this.attIsCorrect);
    try {
      this.ast = MathLex.parse(this.userInput);
      this.latex = MathLex.render(this.ast, 'latex');
      var str_version = this.latex.toString();  //cast to string to ensure katex can parse it
      katex.render(str_version, document.getElementById('problem-input'));
      console.log(this.ast);
      document.getElementById('text-box-problem').style.color = 'black';
    }
    catch(e) {
      document.getElementById('text-box-problem').style.color = 'red';
    }
  }

  submitSolution() {
    if(document.getElementById('text-box-problem').style.color == 'red' || document.getElementById('text-box-problem').style.length === 0) {
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
          .then(function(res) {
            console.log(res);
            if(res.data.result === 'success') {
              //this.attIsCorrect = true; //not working?
              document.getElementById('text-box-problem').style.color = 'green';
            }
          });
      }
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
      myproblemid: '='
    }
  })
  .name;
