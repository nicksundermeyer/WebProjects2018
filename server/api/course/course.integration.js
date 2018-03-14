'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

import User from '../user/user.model';

var app = require('../..');
import request from 'supertest';



describe('Course API:', function() {
  var newCourse;
  var token;
  //login
  describe('Login /auth/local', function(){
    var user;
    // Clear users before testing
    before(function() {
      return User.remove().then(function () {
        user = new User({
          name: 'Fake Teacher',
          email: 'teacher@example.com',
          password: 'ps-teacher',
          role: 'teacher'
        });

        return user.save();
      });
    });

    before(function (done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'teacher@example.com',
          password: 'ps-teacher'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should validate token exists', function () {
      expect(token).to.not.be.an('undefined');
    });
  });

  //show all courses
  describe('GET api/courses', function () {
    var getCourses;

    beforeEach(function (done) {
      request(app)
        .get('/api/courses')
        .expect(200)
        .expect('Content-type', 'application/json; charset=utf-8')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          getCourses = res.body;
          done();
        });
    });

    it('should respond with a json array', function () {
      expect(getCourses).to.be.instanceOf(Array);
    });
  });

});

