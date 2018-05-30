'use strict';

import angular from 'angular';

export class CourseCardComponent {
  courses = [
    {
      courseId: 12345,
      name: 'test course 1'
    },
    {
      courseId: 67890,
      name: 'test course 2'
    },
    {
      courseId: 50824,
      name: 'test course 3'
    },
    {
      courseId: 430820,
      name: 'test course 4'
    }
  ];
  hideStats = true;
  selectedCourse;

  /*@ngInject*/
  constructor($location, $anchorScroll) {
    'ngInject';
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;
  }

  openStatistics(course) {
    this.hideStats = false;
    this.selectedCourse = course;
    document.getElementById('coursePadding').style.height = '50vh';
  }

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
    controllerAs: 'teacherCourseCardController'
  }).name;
