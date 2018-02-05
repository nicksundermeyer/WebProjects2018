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
  constructor($location, $timeout) {
    'ngInject';
    this.$location = $location;
    this.userInput = '';
    this.ast = '';
    this.latex = '';

    $timeout(x => this.load(), 50);
  }

  load() {
    console.log(this.myproblem);
    this.descriptionLatex = MathLex.render(this.myproblem.description.math, 'latex');
    katex.render(this.descriptionLatex, document.getElementById('problemDisplay'));
  }

  updateDisplay() {
    this.ast = MathLex.parse(this.userInput);
    this.latex = MathLex.render(this.ast, 'latex');
    katex.render(this.latex, document.getElementById('display'));
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
