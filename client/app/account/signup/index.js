'use strict';

import angular from 'angular';
import SignupController from './signup.controller';
//create the 'webProjectApp.signup' default module and controller
export default angular.module('webProjectsApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
