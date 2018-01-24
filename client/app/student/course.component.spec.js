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
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    courseComponent = $componentController('course', {
      $http,
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    courseComponent.$onInit();
    $httpBackend.flush();
    expect(courseComponent.awesomeThings.length)
      .to.equal(4);
  });
});
