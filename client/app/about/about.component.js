import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';

export class AboutController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
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
