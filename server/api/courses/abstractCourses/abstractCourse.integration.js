'use strict';

/* globals describe, expect, it, beforeEach, afterEach, before */

/*
    Routes to test: (those which call a function in abstractCourse.controller)

     router.get('/', abstractCourseController.index);
     router.get('/:id', abstractCourseController.show);
     router.post('/', auth.hasRole('teacher'), abstractCourseController.create);
     router.delete('/:id', auth.hasPermission('teacher'), abstractCourseController.destroy);
     router.put('/:id', auth.hasPermission('teacher'), abstractCourseController.update);

    We should make sure to test authentication as well. Do tests for all roles.
 */

import User from '../../users/user.model';
import request from 'supertest';

var app = require('../../..');

describe('Abstract Course Tests', function() {
  var coursePayload = {
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

  var courseResponse;

  /* Test as a teacher */
  describe('Test Abstract courses as a teacher', function () {
    var teacher;
    var teacherAuthToken;

    var teacherPayload = {
      name: 'Fake Teacher',
      email: 'teacher@example.com',
      password: 'ps-teacher',
      role: 'teacher'
    };

    // Clear users before testing
    before(function () {
      return User.remove().then(function () {
        teacher = new User(teacherPayload);
        return teacher.save();
      });
    });

    before(function (done) {
      request(app)
        .post('/auth/local')
        .send(teacherPayload)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          teacherAuthToken = res.body.token;
          done();
        });
    });

    it('should validate token exists', function () {
      expect(teacherAuthToken).to.not.be.an('undefined');
    });

    //
    describe('Get all courses', function () {
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

    //create a course if a teacher
    describe('Create a course', function () {

      beforeEach(function (done) {
        request(app)
          .post('/api/courses')
          .set('authorization', `Bearer ${teacherAuthToken}`)
          .send(coursePayload)
          .expect(201)
          .expect('Content-type', 'application/json; charset=utf-8')
          .then(data => {
            courseResponse = data.body;
            done();
          });
      });

      it('should respond with the newly created thing', function () {
        expect(courseResponse.name).to.equal('survival class');
        expect(courseResponse.description).to.equal('how to make fire');
        expect(courseResponse.subjects).to.equal('booleanLogic');
        expect(courseResponse.categories).to.equal('or');
      });

    });

  });

  /* Test as a student */
  describe('Test Abstract courses as a student', function () {
    var student;
    var studentAuthToken;

    var studentPayload = {
      name: 'Fake Student',
      email: 'student@example.com',
      password: 'ps-student',
      role: 'student'
    };

    // Clear users before testing
    before(function () {
      return User.remove().then(function () {
        student = new User(studentPayload);
        return student.save();
      });
    });

    before(function (done) {
      request(app)
        .post('/auth/local')
        .send(studentPayload)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          studentAuthToken = res.body.token;
          done();
        });
    });

    it('should validate token exists', function () {
      expect(studentAuthToken).to.not.be.an('undefined');
    });

    //
    describe('Get all courses', function () {
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

    describe('Create a course', function () {
      beforeEach(function (done) {
        request(app)
          .post('/api/courses')
          .set('authorization', `Bearer ${studentAuthToken}`)
          .send(coursePayload)
          .expect(403)
          .expect('Content-type', 'text/html; charset=utf-8"')
          .end(data => {
            courseResponse = data.body;
            done();
          });
      });

      it('should block us from creating a course', function () {
        expect(courseResponse).to.be.an('undefined');
      });
    });
  });

});

