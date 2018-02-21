'use strict';

import angular from 'angular';
import 'mathlex';
import katex from 'katex';

export class ProblemCardComponent {

  userInput;
  ast;
  latex;
  descriptionLatex;

  /*@ngInject*/
  constructor($location, $scope) {
    'ngInject';
    this.$location = $location;
    this.userInput = '';
    this.ast = '';
    this.latex = '';
    var vm = this;
    this.isClicked = false;

    $scope.$watch(() => this.myproblem, function(newVal) {
      if(newVal) {
        vm.load();
      }
    });
  }

  click() {
    if(this.isClicked) {
      this.isClicked = false;
    } else {
      this.isClicked = true;
    }
  }
  load() {
    this.descriptionLatex = MathLex.render(this.myproblem.description.math, 'latex');
    katex.render(this.descriptionLatex, document.getElementById('problemDisplay-problem'));
  }

  updateDisplay() {
    this.ast = MathLex.parse(this.userInput);
    this.latex = MathLex.render(this.ast, 'latex');
    var str_version = this.latex.toString();  //cast to string to ensure katex can parse it
    katex.render(str_version, document.getElementById('problem-input'));
  }
  append(htmlVal) {
    if(htmlVal == 'sqrt') {
      if(this.userInput) { //not empty
        this.userInput += '*sqrt(x)';
        this.updateDisplay();
      } else {
        this.userInput += 'sqrt(x)';
        this.updateDisplay();
      }
    } else if(htmlVal == 'plus') {
      this.userInput += '+x';
      this.updateDisplay();
    } else if(htmlVal == 'mult') {
      this.userInput += '*x';
      this.updateDisplay();
    } else if(htmlVal == 'div') {
      this.userInput += '/x';
      this.updateDisplay();
    } else if(htmlVal == 'equals') {
      this.userInput += '= x';
      this.updateDisplay();
    } else if(htmlVal == 'greater') {
      this.userInput += '>x';
      this.updateDisplay();
    } else if(htmlVal == 'less') {
      this.userInput += '<x';
      this.updateDisplay();
    }
  }
}

export default angular.module('directives.problemCard', [])
  .component('problemCard', {
    template: require('./problemCard.html'),
    controller: ProblemCardComponent,
    controllerAs: 'problemCardController',
    bindings: {
      myproblem: '='
    }
  })
  .name;
