'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';
//creates the setting module and controller
export default angular.module('webProjectsApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
