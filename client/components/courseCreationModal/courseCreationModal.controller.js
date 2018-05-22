'use strict';

import angular from 'angular';
export class CourseCreationModalController {
  /*@ngInject*/
  constructor($uibModalInstance, Course) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.Course = Course;
  }
  $onInit() {}
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
  submit() {
    console.log('course creation');
    // submit the course to be created
    this.Course.createCourse(this.course)
      .then(result => {
        this.formInfo =
          'Abstract Course (id=' + result._id + ') successfully created!';
      })
      .catch(err => {
        console.error(err);
      });
  }
}
export default // .config(['$qProvider', function($qProvider) {    //Once the module is defined .config is used to configure routing for the application
//   $qProvider.errorOnUnhandledRejections(false);
// }])
angular
  .module('directives.courseCreationModal', [])
  .controller('courseCreationModal', CourseCreationModalController).name;
