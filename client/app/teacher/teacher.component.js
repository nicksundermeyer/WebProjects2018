import angular from 'angular';
const ngRoute = require('angular-route');
const uiBootstrap = require('angular-ui-bootstrap');
import routing from './teacher.routes';
import gravatar from 'gravatar';
import auth from '../../services/auth/auth.module';
import user from '../../services/user/user.module';
//const uid3 = require ('d3')
const uinvd3 = require('angular-nvd3');
import d3 from 'angular-nvd3';

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

    this.options = JSON.stringify({
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
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
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 30
        }
      }
    });

    this.data = JSON.stringify([
      {
        key: 'Cumulative Return',
        values: [
          { label: 'A', value: -29.765957771107 },
          { label: 'B', value: 0 },
          { label: 'C', value: 32.807804682612 },
          { label: 'D', value: 196.45946739256 },
          { label: 'E', value: 0.19434030906893 },
          { label: 'F', value: -98.079782601442 },
          { label: 'G', value: -13.925743130903 },
          { label: 'H', value: -5.1387322875705 }
        ]
      }
    ]);
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
  .module('webProjectsApp.teacher', [ngRoute, uiBootstrap, uinvd3, auth, user])
  .config(routing)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherController,
    controllerAs: 'teacherController'
  }).name;
