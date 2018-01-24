'use strict';

import angular from 'angular';

export class ProblemCardComponent {
  /*@ngInject*/
  constructor($location) {
    'ngInject';
    this.$location = $location;
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
