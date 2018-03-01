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
    this.basic_operators_isClicked = false;
    this.constants_isClicked = false;
    this.logical_isClicked = false;

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
    this.descriptionLatex = MathLex.render(this.myproblemspecific.description.math, 'latex');
    katex.render(this.descriptionLatex, document.getElementById('problemDisplay-problem'));
  }

  updateDisplay() {
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

  append(htmlVal) {
    if(htmlVal == 'sqrt') {
      if(this.userInput) { //if not empty
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
    } else if(htmlVal == 'pi') {
      this.userInput += 'pi';
      this.updateDisplay();
    } else if(htmlVal == 'e') {
      this.userInput += 'e';
      this.updateDisplay();
    } else if(htmlVal == 'infinity') {
      this.userInput += 'infinity';
      this.updateDisplay();
    } else if(htmlVal == 'i') {
      this.userInput += 'i';
      this.updateDisplay();
    } else if(htmlVal == 'zeta') {
      this.userInput += '#Z';
      this.updateDisplay();
    } else if(htmlVal == 'tau') {
      this.userInput += '#tau';
      this.updateDisplay();
    } else if(htmlVal == 'rightarrow') {
      this.userInput += '-> x';
      this.updateDisplay();
    } else if(htmlVal == 'leftarrow') {
      this.userInput += '<- x';
      this.updateDisplay();
    } else if(htmlVal == 'forall') {
      this.userInput += 'forall x -> x';
      this.updateDisplay();
    } else if(htmlVal == 'exists') {
      this.userInput += 'exists x : x';
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
      myproblemgeneral: '=',
      myproblemspecific: '='
    }
  })
  .name;
