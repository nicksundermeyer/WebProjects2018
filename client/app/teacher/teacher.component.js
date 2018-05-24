import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './teacher.routes';

export class TeacherController {
  courses = [];
  teacher;
  gravatarUrl;

  /*@ngInject*/
  constructor($http, $uibModal, Course, Auth, UserServ) {
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.Course = Course;
    this.Auth = Auth;
    this.UserServ = UserServ;
  }

  $onInit() {
    // get teacher's courses
    this.Auth.getCurrentUser().then(teacher => {
      // get courses the teacher owns from server and add them to the local array
      this.UserServ.getUsersCourses(teacher._id).then(response => {
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
    });
  }

  // open modal
  createModal() {
    this.$uibModal.open({
      template: require('../../components/courseCreationModal/courseCreationModal.html'),
      controller: 'courseCreationModal as courseCreationModal'
    });
  }
}

export default angular
  .module('webProjectsApp.teacher', [ngRoute])
  .config(routing)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherController,
    controllerAs: 'teacherController'
  }).name;
