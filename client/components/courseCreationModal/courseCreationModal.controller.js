'use strict';

import angular from 'angular';
import shared from '../../../server/config/environment/shared';

export class CourseCreationModalController {
  course = {
    name: '',
    description: '',
    subjects: '',
    categories: [],
    assignments: [
      {
        title: '',
        description: '',
        minNumProblems: '',
        maxNumProblems: '',
        newProblemPercentage: '',
        numberOfPossibleAttempts: ''
      }
    ]
  };
  subjects = [];
  categories = [];
  title = 'Create Course';

  /*@ngInject*/
  constructor($uibModalInstance, Course) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.Course = Course;
  }

  $onInit() {
    // getting subjects and categories for selections
    this.subjects = shared.allSubjects;
    this.categories = shared.allCategories;
    this.title = 'Create Course';
  }

  close() {
    this.$uibModalInstance.dismiss('close');
  }

  submit() {
    // submit the course to be created
    this.Course.createCourse(this.course)
      .then(result => {
        console.log(result);
        this.title =
          'Abstract Course (id=' + result.data._id + ') successfully created!';
      })
      .catch(err => {
        console.error(err);
      });
  }

  addAssignment() {
    this.course.assignments.push({
      title: '',
      description: '',
      minNumProblems: '',
      maxNumProblems: '',
      newProblemPercentage: '',
      numberOfPossibleAttempts: ''
    });
  }

  removeAssignment(index) {
    this.course.assignments.splice(index, 1);
  }
}

export default angular
  .module('directives.courseCreationModal', [])
  .controller('courseCreationModal', CourseCreationModalController).name;
