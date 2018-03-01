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
            this.courses = [];
            response.data.forEach(aCourse => {
              console.log(aCourse);
              var tempCourse = {
                name: aCourse.abstractCourseID.name,
                description: aCourse.abstractCourseID.description,
                categories: aCourse.categories,
                subjects: aCourse.subjects,
                _id: aCourse.abstractCourseID._id
              }
              this.courses.push(tempCourse);
            });
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
