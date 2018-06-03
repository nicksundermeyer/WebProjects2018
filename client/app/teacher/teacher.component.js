import angular from 'angular';
import routing from './teacher.routes';
import gravatar from 'gravatar';
import auth from '../../services/auth/auth.module';
import user from '../../services/user/user.module';

const ngRoute = require('angular-route');
const uiBootstrap = require('angular-ui-bootstrap');

const d3 = require('d3');
const nvd3 = require('nvd3');
const uinvd3 = require('angular-nvd3');

export class TeacherController {
  courses = [];
  teacher;
  gravatarUrl;
  options;
  data;

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

    this.options = {
      chart: {
        type: 'pieChart',
        height: 500,
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

    this.data = [
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
  .module('webProjectsApp.teacher', [ngRoute, uiBootstrap, auth, user, uinvd3])
  .config(routing)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherController,
    controllerAs: 'teacherController'
  }).name;
