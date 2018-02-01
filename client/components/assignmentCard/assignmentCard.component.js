'use strict';

import angular from 'angular';

export class AssignmentCardComponent {

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
