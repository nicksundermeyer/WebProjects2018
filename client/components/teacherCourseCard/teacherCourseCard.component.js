'use strict';

import angular from 'angular';

export class CourseCardComponent {
  courses = [];
  hideStats = true;
  selectedCourse;

  /*@ngInject*/
  constructor($location, $anchorScroll) {
    'ngInject';
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;
  }

  $onInit() {}

  // open statistics div
  openStatistics(course) {
    // set hidden to false and save the currently selected course
    this.hideStats = false;
    this.selectedCourse = course;

    // add padding below course cards to allow scrolling while screen is covered by div
    document.getElementById('coursePadding').style.height = '50vh';
  }

  // close stats div
  closeStatistics() {
    this.hideStats = true;
    this.selectedCourse = '';
    document.getElementById('coursePadding').style.height = '0';
  }
}

//binding mycourse to = operator
export default angular
  .module('directives.teacher-course-card', [])
  .component('teacherCourseCard', {
    template: require('./teacherCourseCard.html'),
    controller: CourseCardComponent,
    controllerAs: 'teacherCourseCardController',
    bindings: {
      courses: '='
    }
  }).name;
