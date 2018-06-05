'use strict';

import angular from 'angular';
import LoginController from './login.controller';
import user from '../../../services/user/user.module';
import auth from '../../../services/auth/auth.module';
//creates the login module and controller component
export default angular
  .module('webProjectsApp.login', [auth, user])
  .controller('LoginController', LoginController).name;
