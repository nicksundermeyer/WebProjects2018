'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCourse;

describe('Course API:', function() {
  describe('GET /api/courses', function() {
    var courses;

    beforeEach(function(done) {
      request(app)
        .get('/api/courses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          courses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(courses).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/courses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/courses')
        .send({
          subject: 'New Course: The History of the Nile',
          maxStudents: 30
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCourse = res.body;
          done();
        });
    });

    it('should respond with the newly created course', function() {
      expect(newCourse.subject).to.equal('New Course: The History of the Nile');
      expect(newCourse.maxStudents).to.equal(30);
    });
  });

  describe('GET /api/courses/:id', function() {
    var course;

    beforeEach(function(done) {
      request(app)
        .get(`/api/courses/${newCourse._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          course = res.body;
          done();
        });
    });

    afterEach(function() {
      course = {};
    });

    it('should respond with the requested course', function() {
      expect(course.subject).to.equal('New Course: The History of the Nile');
      expect(course.maxStudents).to.equal(30);
    });
  });

  describe('PUT /api/courses/:id', function() {
    var updatedCourse;

    beforeEach(function(done) {
      request(app)
        .put(`/api/courses/${newCourse._id}`)
        .send({
          subject: 'Updated Course: Greek Philosophy',
          maxStudents: 20
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCourse = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCourse = {};
    });

    it('should respond with the updated course', function() {
      expect(updatedCourse.subject).to.equal('Updated Course: Greek Philosophy');
      expect(updatedCourse.maxStudents).to.equal(20);
    });

    it('should respond with the updated course on a subsequent GET', function(done) {
      request(app)
        .get(`/api/courses/${newCourse._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let course = res.body;

          expect(course.subject).to.equal('Updated Course: Greek Philosophy');
          expect(course.maxStudents).to.equal(20);

          done();
        });
    });
  });

  //check if PATCH is needed
  describe('PATCH /api/courses/:id', function() {
    var patchedCourse;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/courses/${newCourse._id}`)
        .send([
          { op: 'replace', path: '/subject', value: 'Patched Course: Film in ancient Greece' },
          { op: 'replace', path: '/maxStudents', value: 50 }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCourse = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCourse = {};
    });

    it('should respond with the patched course', function() {
      expect(patchedCourse.subject).to.equal('Patched Course: Film in ancient Greece');
      expect(patchedCourse.maxStudents).to.equal(50);
    });
  });

  describe('DELETE /api/courses/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/courses/${newCourse._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when course does not exist', function(done) {
      request(app)
        .delete(`/api/course/${newCourse._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
