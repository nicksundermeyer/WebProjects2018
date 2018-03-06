'use strict';

import angular from 'angular';
export class ProblemConfirmationModalController {

  /*@ngInject*/
  constructor($uibModalInstance, message, Course) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.message = message;
    this.Course = Course;
  }
  $onInit() {
    console.log('modal controller work');
  }
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submit() {
    //this.Course.
  }
}

export default angular.module('directives.problemConfirmationModal', [])
  .controller('problemConfirmationModalController', ProblemConfirmationModalController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
