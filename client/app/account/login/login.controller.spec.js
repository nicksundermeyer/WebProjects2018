'use strict';

import login from './login.controller';
import {
  LoginController
} from './login.controller';

var form = { //Spoofing the form object
  valid: True
};

var user = {
  email: 'test@email.com',
  password: 'test123'
};

describe("Tests for login.controller", function () {
  beforeEach(angular.module.mock(login)); //Mocking angular

  var scope;
  var loginComponent;
  var $httpBackend;

  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope){
    scope = $rootScope.$new();

    loginComponent = $componentController('login', {
      $http,
      $scope: scope
    });

    //Every 'it' is a test that is running. The string parameter is the description
    //and the expect is the actual test.
    it("Submitted is true", function(){
      expect(loginComponent.submitted == true)
    });

    it("Form valid check", function(){
      expect(loginComponent.email == 'test@email.com');
      expect(loginComponent.password == 'test123');
    })

  }));
})
