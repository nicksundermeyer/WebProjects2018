'use strict';

import angular from 'angular';

export class TypeaheadComponent {
  /*@ngInject*/
  constructor($location) {
    'ngInject';
    this.$location = $location;
    this.selected = [];
  }

  clear() {
    this.selected = [];
  }

}

export default angular.module('directives.typeahead', [])
  .component('typeahead', {
    template: require('./typeahead.html'),
    controller: TypeaheadComponent,
    controllerAs: 'typeaheadController',
    bindings: {
      values: '=',
      submit: '&'
    }
  })
  .name;
