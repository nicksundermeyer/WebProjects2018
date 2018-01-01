'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
     || 'mongodb://localhost/webprojects-test'
  }
};
