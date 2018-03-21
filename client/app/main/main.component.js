import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
  }

}

export default angular.module('webProjectsApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
