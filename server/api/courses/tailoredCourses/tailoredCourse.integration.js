
 'use strict';

 // globals describe, expect, it, beforeEach, afterEach, before

import User from '../../users/user.model';

var app = require('../../..');
import request from 'supertest';

describe('Tailored Course Tests:', function() {
  var newCourse = {
      name: 'survival class',
      description: 'how to make fire',
      subjects: ['booleanLogic'],
      categories: ['or'],
      assignment: [{
        title: 'assignment 1',
        description: 'find trees',
        minNumProblems: 5,
        maxNumProblems: 10,
        newProblemPercentage: 17
      }]
  };
  var token;

  //login
  describe('Login /auth/local', function() {
    var user;
    // Clear users before testing
    before(function() {
      return User.remove().then(function() {
        user = new User({
          name: 'Fake Student',
          email: 'student@example.com',
          password: 'ps-student',
          role: 'student'
        });

        return user.save();
      });
    });

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'student@example.com',
          password: 'ps-student'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should validate token exists', function() {
      expect(token).to.not.be.an('undefined');
    });
  });

  // enroll in a course if a student
  describe('Enroll in Course', function() {

  });

});



