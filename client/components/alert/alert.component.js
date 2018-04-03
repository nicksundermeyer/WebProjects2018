'use strict';

import angular from 'angular';

export class AlertComponent {
  /*@ngInject*/
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
  }
}

function AlertCtrl ($scope) {
  $scope.alerts = [];

  // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
  // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }

  $scope.addAlert = function(type, msg) {
    $scope.alerts.push({type: type, msg: msg});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

AlertCtrl.$inject = ["$scope"];

export default angular.module('directives.alert', [])
  .controller('AlertCtrl', AlertCtrl)
  .name;
