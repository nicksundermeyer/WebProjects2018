'use strict';
console.log("index.js 2");

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("index.js 6");

if(env === 'development' || env === 'test') {
  // Register the Babel require hook
  require('babel-register');
}
console.log("index.js 12");

// Export the application

exports = module.exports = require('./app');
