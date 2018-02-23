import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './student.routes';

export class StudentController {

  courses = [];
  studentId;
  student;

  /*@ngInject*/
  constructor($http, UserServ, Auth) {
    this.$http = $http;
    this.UserServ = UserServ;
    this.Auth = Auth;
  }

  $onInit() {
    this.Auth.getCurrentUser()
      .then(student => {
        this.UserServ.getUsersCourses(student._id)
          .then(response => {
            this.courses = response.data;
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default angular.module('webProjectsApp.student', [ngRoute])
  .config(routing)
  .component('student', {
    template: require('./student.html'),
    controller: StudentController,
    controllerAs: 'studentController'
  })
  .name;
