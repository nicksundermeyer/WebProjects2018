'use strict';

import angular from 'angular';

export class AssignmentCardComponent {
  test = 100;
  /*@ngInject*/
  constructor($location) {
    'ngInject';
    this.$location = $location;
  }

}

export default angular.module('directives.assignmentCard', [])
  .component('assignmentCard', {
    template: require('./assignmentCard.html'),
    controller: AssignmentCardComponent,
    controllerAs: 'assignmentCardController',
    bindings: {
      assignment: '=',
      courseid: '='
    }
  })
  .name;
