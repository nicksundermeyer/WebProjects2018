'use strict';

/* globals describe, expect, it, beforeEach, afterEach, before */

import User from '../user/user.model';

var app = require('../..');
import request from 'supertest';

describe('Course API:', function() {
  var newCourse;
  var token;

  //login
  describe('Login /auth/local', function() {
    var user;
    // Clear users before testing
    before(function() {
      return User.remove().then(function() {
        user = new User({
          name: 'Fake Teacher',
          email: 'teacher@example.com',
          password: 'ps-teacher',
          role: 'teacher'
        });

        return user.save();
      });
    });

    before(function(done) {
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

    it('should validate token exists', function() {
      expect(token).to.not.be.an('undefined');
    });
  });

  //show all courses
  describe('GET api/courses', function() {
    var getCourses;

    beforeEach(function(done) {
      request(app)
        .get('/api/courses')
        .expect(200)
        .expect('Content-type', 'application/json; charset=utf-8')
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          getCourses = res.body;
          done();
        });
    });

    it('should respond with a json array', function() {
      expect(getCourses).to.be.instanceOf(Array);
    });
  });

  //create a course if a teacher
  describe('POST api/courses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/courses')
        .set('authorization', `Bearer ${token}`)
        .send({
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
        })
        .expect(201)
        .expect('Content-type', 'application/json; charset=utf-8')
        .end((err, res) => {
          if(err) {
            console.log('Bearer ' + token);
            return done(err);
          }
          newCourse = res.body;
          done();
        });
    });
    it('should respond with the newly created thing', function() {
      expect(newCourse.name).to.equal('survival class');
      expect(newCourse.description).to.equal('how to make fire');
      expect(newCourse.subjects).to.equal('booleanLogic');
      expect(newCourse.categories).to.equal('or');
      //expect(newCourse.assignments[0].title).to.equal('assignment 1');
      // expect(newCourse.assignment.description).to.equal('find trees');
      // expect(newCourse.assignment.minNumProblems).to.equal(5);
      // expect(newCourse.assignment.maxNumProblems).to.equal(10);
      // expect(newCourse.assignment.newProblemPercentage).to.equal(17);
    });
  });
});

