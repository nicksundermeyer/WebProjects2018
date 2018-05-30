'use strict';

import angular from 'angular';
import 'mathlex_server_friendly';

//import mathlex from 'mathlex_server_friendly';
import katex from 'katex';
require('../../../node_modules/mathquill/build/mathquill');
import { AssignmentController } from '../../app/student/studentAssignment/assignment.component';
//import kas from 'kas/kas';

export class ProblemCardComponent {
  userInput;
  ast;
  latex;
  descriptionLatex;
  attIsCorrect;
  problem;
  remainingAttempts;
  isCorrect;

  /*@ngInject*/
  constructor($location, $scope, $uibModal, Assignment, $routeParams) {
    'ngInject';
    this.$location = $location;
    this.userInput = 'x=';
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
    this.mathQuill('');

    /*$watch is checking if newVal is true then load virtual machine */
    $scope.$watch(() => this.myproblemgeneral, function(newVal) {
      if (newVal) {
        vm.load();
      }
    });

    $scope.$watch(() => this.myproblemspecifc, function(newVal) {
      if (newVal) {
        vm.load();
      }
    });
  }

  click(name) {
    if (this[name]) {
      this[name] = false;
    } else {
      this[name] = true;
    }
  }

  load() {
    if (this.ischanged === true) {
      this.userInput = 'x=';
      this.updateDisplay();
      this.ischanged = false;
    }
    this.descriptionLatex = MathLex.render(
      this.myproblemspecific.description.math,
      'latex'
    );
    console.log('description latex: ' + this.descriptionLatex);
    katex.render(
      this.descriptionLatex,
      document.getElementById('problemDisplay-problem')
    );
    console.log('remaining: ' + this.remainingAttempts);
    console.log('allowed: ' + this.myproblemgeneral.numberOfAllowedAttempts);
    console.log('length: ' + this.myproblemgeneral.attempts.length);
    this.remainingAttempts = 3;
    /*this.myproblemgeneral.numberOfAllowedAttempts -
      this.myproblemgeneral.attempts.length;*/
  }

  /*Try and Catch to see if parsing and rendering works ok*/
  updateDisplay() {
    try {
      this.ast = MathLex.parse(this.userInput);
      this.latex = MathLex.render(this.ast, 'latex');
      var str_version = this.latex.toString(); //cast to string to ensure katex can parse it
      katex.render(str_version, document.getElementById('problem-input'));
    } catch (e) {}
  }

  submitSolution() {
    this.Assignment.submitSolution(
      this.$routeParams.courseId,
      this.myuserid,
      this.$routeParams.assignmentId,
      this.myproblemid,
      this.latex
    )
      .async()
      .then(res => {
        console.log('res: ' + res);
        console.log('data: ' + res.data.result);
        if (res.data.result === 'success') {
          document.getElementById('text-box-problem').style.color = 'green';
          this.addAlert('success', 'Correct!');
        } else {
          document.getElementById('text-box-problem').style.color = 'red';
          this.addAlert('danger', 'Incorrect!');
        }
        this.remainingAttempts =
          res.data.numberOfAllowedAttempts - res.data.numberOfAttempts;
      });
  }

  attemptInfo() {
    this.remainingAttempts =
      this.myproblemgeneral.numberOfAllowedAttempts -
      this.myproblemgeneral.attempts.length;
  }

  mappings = {
    sqrt: ['\\sqrt'],
    plus: ['+'],
    mult: ['*'],
    div: ['/'],
    equals: ['='],
    greater: ['>'],
    less: ['<'],
    pi: ['\\pi'],
    e: ['\\e'],
    infinity: ['\\infinity'],
    i: ['\\imaginary'],
    zeta: ['\\zeta'],
    tau: ['\\tau'],
    rightarrow: ['\\rightarrow'],
    leftarrow: ['\\leftarrow'],
    forall: ['\\forall'],
    exists: ['\\exists']
  };

  mathQuill(htmlVal) {
    var MQ = MathQuill.getInterface(2); // for backcompat
    var mathFieldSpan = document.getElementById('math-field'); //Mathfield textarea

    if (htmlVal == '') {
      MQ.MathField(mathFieldSpan).write('x = '); //Initially sets mathfield to contain 'x = '
    } else {
      MQ.MathField(mathFieldSpan).typedText(this.mappings[htmlVal].toString()); //Updates the mathfield with the corresponding button clicked
      MQ.MathField(mathFieldSpan).keystroke('Enter'); //Needed for button clicking
    }
  }

  append(htmlVal) {
    if (htmlVal) {
      this.userInput += this.mappings[htmlVal][0];
    } else {
      if (this.mappings[htmlVal].length > 1) {
        this.userInput += this.mappings[htmlVal][1];
      } else {
        this.userInput += this.mappings[htmlVal][0];
      }
    }
    this.updateDisplay();
  }

  addAlert(type, msg) {
    console.log('added alert');
    this.alerts.push({ type, msg });
    if (msg == 'Correct!') {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

  closeAlert(index) {
    console.log('closed alert');
    this.alerts.splice(index, 1);
    if (this.isCorrect == true) {
      localStorage.setItem(
        'ProblemNumber',
        parseInt(localStorage.getItem('ProblemNumber')) + 1
      );
    }
  }
}

export default angular
  .module('directives.problemCard', [])
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
  }).name;
