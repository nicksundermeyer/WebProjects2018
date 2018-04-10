'use strict';

import angular from 'angular';

export class AlertComponent {
  /*@ngInject*/
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    this.alerts = [];
  }

  addAlert(type, msg) {
    this.alerts.push({type: type, msg: msg});
  };

  closeAlert(index) {
    this.alerts.splice(index, 1);
  }
}

export default angular.module('directives.alert', [])
  .component('alert', {
    template: require('./alert.html'),
    controller: AlertComponent,
    controllerAs: 'alertController',
    bindings: {
      success: '='
    }
  })
  .name;