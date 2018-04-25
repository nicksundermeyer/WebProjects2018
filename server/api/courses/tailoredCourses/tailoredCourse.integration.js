'use strict';

// globals describe, expect, it, beforeEach, afterEach, before

import User from '../../users/user.model';

var app = require('../../..');
import request from 'supertest';

describe('Tailored Course Tests:', function() {
  var validCoursePayload = {
    id: '12345',
    name: 'survival class',
    description: 'how to make fire',
    subjects: ['booleanLogic'],
    categories: ['or']
  };

  var existingStudent = {
    id: '12345',
    name: 'Fake Student2',
    email: 'student2@example.com',
    password: 'ps-student2',
    role: 'student'
  };

  var teacherPayload = {
    name: 'Fake Teacher',
    email: 'teacher@example.com',
    password: 'ps-teacher',
    role: 'teacher'
  };

  var studentPayload = {
    name: 'Fake Student',
    email: 'student@example.com',
    password: 'ps-student',
    role: 'student'
  };

  var studentToken, teacherToken, student2Token, tcSolutionsResponse;

  // Clear users and create a teacher and student to use duration of tests
  before(function(done) {
    User.remove().then(function() {
      var teacher = new User(teacherPayload);
      var student = new User(studentPayload);
      student.save();
      teacher.save(done);
    });
  });

  // Bad Student login
  describe('Bad Student Login Attempt /auth/local', function() {
    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'student@example.com',
          password: 'pss-student'
        })
        .expect(401)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          studentToken = res.body.token;
          done();
        });
    });

    it('should validate token does not exist', function() {
      expect(studentToken).to.be.an('undefined');
    });
  });

  // Good Student login
  describe('Good Student Login Attempt /auth/local', function() {
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
          studentToken = res.body.token;
          done();
        });
    });

    it('should validate token exists', function() {
      expect(studentToken).to.not.be.an('undefined');
    });
  });

  // Bad Teacher login
  describe('Bad Teacher Login Attempt /auth/local', function() {
    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'teacherr@example.com',
          password: 'ps-teacher'
        })
        .expect(401)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          teacherToken = res.body.token;
          done();
        });
    });

    it('should validate token does not exist', function() {
      expect(teacherToken).to.be.an('undefined');
    });
  });

  // Good Teacher login
  describe('Good Teacher Login Attempt /auth/local', function() {
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
          teacherToken = res.body.token;
          done();
        });
    });

    it('should validate token exists', function() {
      expect(teacherToken).to.not.be.an('undefined');
    });
  });

  // Access  a Different Student's Tailored Course
  describe("Access  a Different Student's Tailored Course", function() {
    var TC;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'student2@example.com',
          password: 'ps-student2'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          student2Token = res.body.token;
          done();
        });
    });

    beforeEach(function(done) {
      request(app)
        .get('/api/courses/12345/students/12345')
        .set('authorization', `Bearer ${student2Token}`)
        .expect(401)
        .expect('Content-type', 'text/html; charset=utf-8')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          TC = res.body;
          done();
        });
    });

    it('should respond with unauthorized', function() {
      expect().to.be.an('undefined');
    });
  });
});
