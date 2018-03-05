'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';


var newCourse;


describe('Course API:', function(){

  //show all courses
  describe('GET api/courses', function(){
    var getCourses;

    beforeEach(function(done){
      request(app)
        .get('/api/courses')
        .expect(200)
        .expect('Content-type', 'application/json; charset=utf-8')
        .end((err, res) => {
          if(err){
            return done(err);
          }
          getCourses = res.body;
          done();
        });
    });

    it('should respond with a json array', function(){
      expect(getCourses).to.be.instanceOf(Array);
    });
  });

  // //create a course if a teacher
  // describe('POST api/courses', function() {
  //   var token;
  //   //log in (problem here?)
  //   beforeEach(function(done) {
  //     request(app)
  //       .post('/auth/local')
  //       .send({
  //         email: 'admin@example.com',
  //         password: 'ps-admin'
  //       })
  //       .expect(200)
  //       .expect('Content-Type', /json/)
  //       .end((err, res) => {
  //         token = res.body.token;
  //         done();
  //       });
  //   });
  //
  //   console.log(token);
  //   it('it create data', function(done){
  //     request(app)
  //       .post('/api/courses')
  //       .set('authorization', `Bearer ${token}`)
  //       .send({
  //         name: 'survival class',
  //         description: 'how to make fire',
  //         subjects: ['booleanLogic'],
  //         categories: ['or'],
  //         assignment: [{
  //           title: 'assignment 1',
  //           description: 'find trees',
  //           minNumProblems: 5,
  //           maxNumProblems: 10,
  //           newProblemPercentage: 17
  //         }]
  //       })
  //       .expect(201)
  //       .expect('Content-type', '/json/')
  //       .end((err, res) => {
  //         if(err){
  //           return done(err);
  //         }
  //         newCourse = res.body;
  //         done();
  //       });
  //   });
  //   it('should respond with the newly created thing', function() {
  //     expect(newCourse.name).to.equal('survival class');
  //     expect(newCourse.description).to.equal('how to make fire');
  //     expect(newCourse.subjects).to.equal('booleanLogic');
  //     expect(newCourse.categories).to.equal('or');
  //     expect(newCourse.assignment.title).to.equal('assignment 1');
  //     expect(newCourse.assignment.description).to.equal('find trees');
  //     expect(newCourse.assignment.minNumProblems).to.equal(5);
  //     expect(newCourse.assignment.maxNumProblems).to.equal(10);
  //     expect(newCourse.assignment.newProblemPercentage).to.equal(17);
  //   });
  // });
  //
  // //get course by id
  // describe('GET api/courses/:id', function(){
  //   var getCourse;
  //
  //   beforeEach(function(done){
  //     request(app)
  //       .get(`/api/courses/${newCourse._id}`)
  //       .expect(200)
  //       .expect('Content-type', '/json/')
  //       .end((err, res) => {
  //         if(err){
  //           return done(err);
  //         }
  //         getCourse = res.body;
  //         done();
  //       });
  //   });
  //
  //   afterEach(function(){
  //     getCourse = {};
  //   });
  //
  //   it('should respond with a requested course', function(){
  //     expect(getCourse.name).to.equal('survival class');
  //     expect(getCourse.description).to.equal('how to make fire');
  //     expect(getCourse.subjects).to.equal('booleanLogic');
  //     expect(getCourse.categories).to.equal('or');
  //     expect(getCourse.assignment.title).to.equal('assignment 1');
  //     expect(getCourse.assignment.description).to.equal('find trees');
  //     expect(getCourse.assignment.minNumProblems).to.equal(5);
  //     expect(getCourse.assignment.maxNumProblems).to.equal(10);
  //     expect(getCourse.assignment.newProblemPercentage).to.equal(17);
  //   });
  // });



});
