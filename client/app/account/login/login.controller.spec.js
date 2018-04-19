'use strict';

import login from './login.component';
import { LoginController } from './login.component';

var form = {
  //Spoofing the form object
  valid: true
};

var user = {
  email: 'test@email.com',
  password: 'test123'
};

describe('Tests for login.controller', function() {
  beforeEach(angular.mock.module(login)); //Mocking angular

  var scope;
  var loginController;
  var $httpBackend;

  beforeEach(
    inject(function(
      _$httpBackend_,
      $componentController,
      $rootScope,
      _$location_
    ) {
      scope = $rootScope.$new();

      loginController = $componentController('login', {
        $location: _$location_,
        $scope: scope,
        Auth: {},
        UserServ: {}
      });
    })
  );

  //Every 'it' is a test that is running. The string parameter is the description
  //and the expect is the actual test.
  it('Submitted is true', function() {
    expect(loginController.submitted == true);
  });

  // it("Form valid check", function(){
  //   expect(loginComponent.email == 'test@email.com');
  //   expect(loginComponent.password == 'test123');
  // })
});
