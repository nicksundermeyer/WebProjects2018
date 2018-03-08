'use strict';

import angular from 'angular';
export class ProblemConfirmationModalController {

  /*@ngInject*/
  constructor($uibModalInstance, Assignment, $routeParams, Auth, Course) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.Assignment = Assignment;
    this.$routeParams = $routeParams;
    this.Course = Course;
    this.Auth = Auth;
  }
  $onInit() {
    console.log('modal controller work');
    console.log('check modal problem id');
    console.log(this.myproblemid);
    this.Auth.getCurrentUser()
      .then(student => {
        this.student = student;
        this.myuserid = this.student._id;
      });
  }
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submit() {
    this.Assignment.submitSolution(this.$routeParams.courseId, this.myuserid, this.$routeParams.assignmentId,
      this.myproblemid, this.latex);
  }
}

export default angular.module('directives.problemConfirmationModal', [])
  .controller('problemConfirmationModalController', ProblemConfirmationModalController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
