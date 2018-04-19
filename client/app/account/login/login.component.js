'use strict';
//creates the default login controller
import angular from 'angular';
import AuthService from '../../../components/auth/auth.module';
import UserService from '../../../services/user/user.module';
export class LoginController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;

  /*@ngInject*/
  constructor(Auth, $location, UserServ) {
    this.Auth = Auth;
    this.$location = $location;
    this.UserServ = UserServ;
  }
  //checks the login form once submitted
  login(form) {
    //shows that the for is submitted
    this.submitted = true;
    //checks if the email and password are correct and the form was filled out correctly
    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect
          this.Auth.getCurrentUser()
            .then(user => {
              this.UserServ.getUsersCourses(user._id)
                //redirecnts to the appropriate file depending on the user id
                .then(courses => {
                  if (courses.data.length > 0) {
                    this.$location.path('/student');
                  } else {
                    this.$location.path('/student/course');
                  }
                })
                .catch(() => {
                  this.$location.path('/');
                });
            })
            .catch(() => {
              this.$location.path('/');
            });
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
  $onInit() {}
}

export default angular
  .module('webProjectsApp.login', [AuthService, UserService])
  .controller('LoginController', LoginController).name;
