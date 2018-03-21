'use strict';

import angular from 'angular';
import { UserService } from './user.service';

export default angular.module('webProjectsApp.userService', [])
  .factory('UserServ', UserService)
  .name;
