'use strict';

export default class LoginController {
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

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect
          this.Auth.getCurrentUser()
            .then(user => {
              this.UserServ.getUsersCourses(user._id)
                .then(courses => {
                  if(courses.data.length > 0) {
                    this.$location.path('/student');
                  }
                  else {
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
}
