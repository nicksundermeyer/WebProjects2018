'use strict';

import login from './index';
import { LoginController } from './login.controller';

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
  var $controller;

  beforeEach(
    inject(function(_$httpBackend_, _$controller_, $rootScope, _$location_) {
      scope = $rootScope.$new();
      $controller = _$controller_;

      loginController = $controller('LoginController', {
        $location: _$location_,
        $scope: scope,
        Auth: {},
        UserServ: {}
      });
    })
  );

  //Every 'it' is a test that is running. The string parameter is the description
  //and the expect is the actual test.
  it('Submitted is false', function() {
    expect(loginController.submitted).to.equal(false);
  });

  // it("Form valid check", function(){
  //   expect(loginComponent.email == 'test@email.com');
  //   expect(loginComponent.password == 'test123');
  // })
});
