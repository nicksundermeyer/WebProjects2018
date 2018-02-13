'use strict';

import angular from 'angular';

export class CourseCardComponent {
  /*@ngInject*/
  constructor($location) {
    'ngInject';
    this.$location = $location;
  }

}

export default angular.module('directives.courseCard', [])
  .component('courseCard', {
    template: require('./courseCard.html'),
    controller: CourseCardComponent,
    controllerAs: 'courseCardController',
    bindings: {
      mycourse: '='
    }
  })
  .name;
