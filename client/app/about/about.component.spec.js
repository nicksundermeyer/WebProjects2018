'use strict';

import about from './about.component';
import {
  AboutController
} from './about.component';

describe('Component: AboutComponent', function() {
  beforeEach(angular.mock.module(about));

  var scope;
  var aboutComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    aboutComponent = $componentController('about', {
      $http,
      $scope: scope
    });
  }));
});
