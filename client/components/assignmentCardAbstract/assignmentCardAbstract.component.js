'use strict';

import angular from 'angular';

export class AssignmentCardComponent {

  /*@ngInject*/
  constructor($location) {
    'ngInject';
    this.$location = $location;
  }

  redirect() {
    this.$location.path('/student/course/${this.courseid}/assignment/${this.assignment._id}');
  }


}

export default angular.module('directives.assignmentCardAbstract', [])
  .component('assignmentCardAbstract', {
    template: require('./assignmentCardAbstract.html'),
    controller: AssignmentCardComponent,
    controllerAs: 'assignmentCardAbstractController',
    bindings: {
      assignment: '=',
      courseid: '=',
      istailored: '='
    }
  })
  .name;
