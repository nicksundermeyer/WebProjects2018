import angular from 'angular';
const ngRoute = require('angular-route');
import routing from '../student.routes';

export class CourseAbstractController {

  assignments = [];
  course;
  courseId;
  teacher;
  isTailored;
  student;

  /*@ngInject*/
  constructor($http, $routeParams, courseService) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.courseId = this.$routeParams.id;
    this.courseService = courseService;
    this.isTailored = false;
  }

  $onInit() {
    this.$http.get('/api/courses/' + this.courseId)
      .then(response => {
        this.course = response.data;
        this.assignments = this.course.assignments;
      });

    //student api get
    this.courseService.getStudentInfo();
    console.log(this.student);


    this.$http.get('/api/users/' + this.course.teacherID)
      .then(response => {
        this.teacher = response.data;
      });
  }


  enroll(){
    this.$http.post('/api/courses/' + this.courseId + '/students')
      .then(response => {
        //reset course to returned tailored course
        this.course = response.data;
        this.assignments = this.course.assignments;
        this.isTailored = true;
      });
  }

}

export default angular.module('webProjectsApp.courseAbstract', [ngRoute])
  .config(routing)
  .component('courseAbstract', {
    template: require('./courseAbstract.html'),
    controller: CourseAbstractController,
    controllerAs: 'courseAbstractController',
  })
  .service('courseService', function() {
    this.getStudentInfo = function () {
      this.$http.get('/api/users/me')
        .then(response => {
          this.student = response.data;
        });
    };


    this.isTailored = function () {
      return false;
    }
  })
  .name;

