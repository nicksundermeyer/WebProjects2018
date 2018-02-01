'use strict';

import angular from 'angular';
import 'mathlex';
import katex from 'katex';

export class ProblemCardComponent {

  userInput;
  ast;
  latex;

  /*@ngInject*/
  constructor($location) {
    'ngInject';
    this.$location = $location;

    this.userInput = '';
    this.ast = '';
    this.latex = '';
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
      myProblem: '='
    }
  })
  .name;
