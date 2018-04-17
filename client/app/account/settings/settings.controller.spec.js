'use strict';

import settings from './settings.controller';
import {
  SettingsController
} from './settings.controller';

var form = { //Mocking the form object
  valid: True,
  password: "password"
}

var user = {
  oldPassword: "password",
  newPassword: ""
}

var Auth = {
  changePassword (oldPw, newPw){
    this.password = newPw;
  }
}

describe("Tests for settings.controller", function () {
  beforeEach(angular.module.mock(settings)); //Mocking angular

  var scope;
  var settingsComponent;
  var $httpBackend;

  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope){
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();

    settingsComponent = $componentController('settings', {
      $http,
      $scope: scope
    });

    //Every 'it' is a test that is run. The string parameter is the description
    //and the expect is the actual test.
    it("", function(){
      settingsComponent.changePassword(form);
      expect()
    });

  }));
})
