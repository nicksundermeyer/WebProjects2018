'use strict';

import angular from 'angular';

const d3 = require('d3');
const nvd3 = require('nvd3');
const uinvd3 = require('angular-nvd3');

export class CourseCardComponent {
  courses = [];
  hideStats = true;
  selectedCourse;
  options1;
  data1;
  options2;
  data2;
  options3;
  data3;
  currentCourseStats = {
    categoryMetrics: {
      average: '',
      stdDev: ''
    },
    courseCompletionPercentage: {
      average: '',
      stdDev: ''
    },
    dataCorrelations: {
      average: '',
      stdDev: ''
    },
    failingStudents: [
      {
        average: '',
        stdDev: ''
      }
    ],
    overachievingStudents: {
      average: '',
      stdDev: ''
    },
    problemSetMetrics: {
      average: '',
      stdDev: ''
    },
    studentDistribution: {
      description: '',
      mean: '',
      stdDev: ''
    }
  };

  /*@ngInject*/
  constructor($location, Course) {
    'ngInject';
    this.$location = $location;
    this.Course = Course;
  }

  $onInit() {}

  // open statistics div
  openStatistics(course) {
    // set hidden to false and save the currently selected course
    this.hideStats = false;
    this.selectedCourse = course;

    // get the stats for the currently selected course
    this.Course.getCourseStats(this.selectedCourse._id).then(response => {
      this.currentCourseStats.categoryMetrics = response.data.categoryMetrics; // contains average and standard deviation (stdDev)
      this.currentCourseStats.courseCompletionPercentage =
        response.data.courseCompletionPercentage;
      this.currentCourseStats.dataCorrelations = response.data.dataCorrelations; // contains average and standard deviation (stdDev)
      this.currentCourseStats.failingStudents = response.data.failingStudents;
      this.currentCourseStats.overachievingStudents =
        response.data.overachievingStudents;
      this.currentCourseStats.problemSetMetrics =
        response.data.problemSetMetrics;
      this.currentCourseStats.studentDistribution =
        response.data.studentDistribution;
    });
    console.log(this.currentCourseStats);

    // add padding below course cards to allow scrolling while screen is covered by div
    document.getElementById('coursePadding').style.height = '50vh';

    this.options1 = {
      chart: {
        type: 'pieChart',
        height: 500,
        width: window.innerWidth,
        x: function(d) {
          return d.key;
        },
        y: function(d) {
          return d.y;
        },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };

    this.data1 = [
      {
        key: 'One',
        y: 5
      },
      {
        key: 'Two',
        y: 2
      },
      {
        key: 'Three',
        y: 9
      },
      {
        key: 'Four',
        y: 7
      },
      {
        key: 'Five',
        y: 4
      },
      {
        key: 'Six',
        y: 3
      },
      {
        key: 'Seven',
        y: 0.5
      }
    ];

    this.options2 = {
      chart: {
        type: 'bulletChart',
        width: window.innerWidth,
        duration: 500
      }
    };

    this.data2 = {
      title: 'Revenue',
      subtitle: 'US$, in thousands',
      ranges: [150, 225, 300],
      measures: [220],
      markers: [250]
    };

    this.options3 = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        width: window.innerWidth,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d) {
          return d.label;
        },
        y: function(d) {
          return d.value;
        },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    };

    this.data3 = [
      {
        key: 'Cumulative Return',
        values: [
          {
            label: 'A',
            value: -29.765957771107
          },
          {
            label: 'B',
            value: 0
          },
          {
            label: 'C',
            value: 32.807804682612
          },
          {
            label: 'D',
            value: 196.45946739256
          },
          {
            label: 'E',
            value: 0.19434030906893
          },
          {
            label: 'F',
            value: -98.079782601442
          },
          {
            label: 'G',
            value: -13.925743130903
          },
          {
            label: 'H',
            value: -5.1387322875705
          }
        ]
      }
    ];
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
  .module('directives.teacher-course-card', [uinvd3])
  .component('teacherCourseCard', {
    template: require('./teacherCourseCard.html'),
    controller: CourseCardComponent,
    controllerAs: 'teacherCourseCardController',
    bindings: {
      courses: '='
    }
  }).name;
