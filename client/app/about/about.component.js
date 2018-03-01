import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';
import shared from '../../../server/config/environment/shared';

export class AboutController {

  aboutData;

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.aboutData = shared.aboutData;
  }

}

export default angular.module('webProjectsApp.about', [ngRoute])
  .config(routing)
  .component('about', {
    template: require('./about.html'),
    controller: AboutController,
    controllerAs: 'aboutController'
  })
  .name;
