'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('webProjectsApp.util', [])
  .factory('Util', UtilService)
  .name;
