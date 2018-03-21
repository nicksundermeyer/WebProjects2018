'use strict';

import angular from 'angular';
export class ProblemConfirmationModalController {

  /*@ngInject*/
  constructor($uibModalInstance) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
  }
  $onInit() {
  }
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
  submit() {
    this.$uibModalInstance.close();
  }
}

export default angular.module('directives.problemConfirmationModal', [])
  .controller('problemConfirmationModalController', ProblemConfirmationModalController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
