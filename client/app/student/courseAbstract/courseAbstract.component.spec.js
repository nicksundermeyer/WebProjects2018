'use strict';

import course from './courseAbstract.component';
import {
  CourseController
} from './courseAbstract.component';

describe('Component: CourseAbstractComponent', function() {
  beforeEach(angular.mock.module(course));

  var scope;
  var courseComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    courseComponent = $componentController('courseAbstract', {
      $http,
      $scope: scope
    });
  }));
});
