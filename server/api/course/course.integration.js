'use strict';

/* globals describe, expect, it, before, after, beforeEach, afterEach */

import app from '../..';
import Course from './course.model';
import request from 'supertest';

describe('Courses API:', function() {
  var course;

  // Clear courses before testing
  before(function() {
    return Course.remove().then(function() {
      Course = new Course({
        subject: 'New Subject: Calculus 1',
        maxStudents: 30
      });

      return course.save();
    });
  });

  // Clear courses after testing
  after(function() {
    return Course.remove();
  });

});
