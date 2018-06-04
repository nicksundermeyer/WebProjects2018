import angular from 'angular';
import gravatar from 'gravatar';
const ngRoute = require('angular-route');
import routing from './student.routes';
//This class gets the student's course information and other student information
export class StudentController {
  courses = [];
  studentId;
  student;
  gravatarUrl;

  /*@ngInject*/
  constructor($http, UserServ, Auth) {
    this.$http = $http;
    this.UserServ = UserServ;
    this.Auth = Auth;
  }

  $onInit() {
    this.Auth.getCurrentUser()
      .then(student => {
        //the gravatar implementation should build a url from the email given from the student size 320 px
        this.gravatarUrl = gravatar.url(student.email, {
          s: '320',
          r: 'x',
          d: 'retro'
        });
        this.student = student;

        //gets all the user course information
        this.UserServ.getUsersCourses(student._id).then(response => {
          this.courses = [];
          response.data.forEach(aCourse => {
            console.log(aCourse);
            var tempCourse = {
              name: aCourse.abstractCourseID.name,
              description: aCourse.abstractCourseID.description,
              categories: aCourse.categories,
              subjects: aCourse.subjects,
              _id: aCourse.abstractCourseID._id
            };
            this.courses.push(tempCourse);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
//this creates the default module for 'webProjectsApp.student' and takes the [ngRoute]
export default angular
  .module('webProjectsApp.student', [ngRoute])
  .config(routing)
  .component('student', {
    template: require('./student.html'),
    controller: StudentController,
    controllerAs: 'studentController'
  }).name;
