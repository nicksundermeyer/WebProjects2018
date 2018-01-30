'use strict';

import course from './course.component';
import {
  CourseController
} from './course.component';

describe('Component: CourseComponent', function() {
  beforeEach(angular.mock.module(course));

  var scope;
  var courseComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    courseComponent = $componentController('course', {
      $http,
      $scope: scope
    });
  }));
});
