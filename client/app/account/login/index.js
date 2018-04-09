'use strict';

import angular from 'angular';
import LoginController from './login.controller';
//creates the login module and controller component
export default angular.module('webProjectsApp.login', [])
  .controller('LoginController', LoginController)
  .name;
