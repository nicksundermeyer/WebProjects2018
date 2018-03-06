'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';
import 'bootstrap/dist/css/bootstrap.css';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import assignment from './student/assignment/assignment.component';
import about from './about/about.component';
import course from './student/course/course.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import courseDiscovery from './student/courseDiscovery/courseDiscovery.component';
import assignmentCard from '../components/assignmentCard/assignmentCard.component';
import courseCard from '../components/courseCard/courseCard.component';
import problemCard from '../components/problemCard/problemCard.component';
import problemConfirmationModal from '../components/problemConfirmationModal/problemConfirmationModal.controller';
import typeahead from '../components/typeahead/typeahead.component';
import main from './main/main.component';
import student from './student/student.component';
import teacher from './teacher/teacher.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import courseService from '../services/course/course.module';
import assignmentService from '../services/assignment/assignment.module';
import userService from '../services/user/user.module';


import './app.scss';

angular.module('webProjectsApp', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, _Auth,

  account, admin, 'validation.match', courseService, assignmentService, userService, navbar, about, footer, assignment, course,
  courseCard, assignmentCard, problemCard, problemConfirmationModal, courseDiscovery, typeahead, main, constants, util, student, teacher
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['webProjectsApp'], {
      strictDi: true
    });
  });
