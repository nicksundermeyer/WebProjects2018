import angular from 'angular';
const ngRoute = require('angular-route');
const uiBootstrap = require('angular-ui-bootstrap');
import routing from './teacher.routes';
import gravatar from 'gravatar';
import auth from '../../services/auth/auth.module';
import user from '../../services/user/user.module';

export class TeacherController {
  courses = [];
  teacher;
  gravatarUrl;

  /*@ngInject*/
  constructor($http, $uibModal, Auth, UserServ) {
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.Auth = Auth;
    this.UserServ = UserServ;
  }

  $onInit() {
    // get teacher's courses
    this.Auth.getCurrentUser().then(teacher => {
      // creating gravatar url
      this.gravatarUrl = gravatar.url(teacher.email, {
        s: '320',
        r: 'x',
        d: 'retro'
      });

      // setting current user
      this.teacher = teacher;

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
  .module('webProjectsApp.teacher', [ngRoute, uiBootstrap, auth, user])
  .config(routing)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherController,
    controllerAs: 'teacherController'
  }).name;
