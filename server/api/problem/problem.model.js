'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './problem.events';

var ProblemSchema = new Schema({
  protocol: {
    type: String,
    required: true,
    default: 'dpg'
  },
  version: {
    type: String,
    required: true,
    default: '.01'
  },
  problem: {


    problemId: {
      type: String,
      default: null,
      required: true
    },

    description: {
      type: Object,
      default: null,
      required: true
    },

    depth: {
      type: Number,
      default: 1,
      required: true
    },

    subject: {
      type: String,
      default: null,
      required: true
    },

    category: {
      type: String,
      default: null,
      required: true
    },

    solution: {
      type: Object,
      default: null,
      required: true
    },
  },
// max number of attempts per problem, should come from abstract assignment
  maxNumAttempts: {
    type: Number,
    reuired: true,
    default: 5
  },

  numberOfAllowedAttempts: {
    type: Number,
    default: 1
  },
  attempts: [{
    date: {
      type: Date,
      default: Date.now
    },
    //attempt here is whatever the student send as a solution
    //so attempt should be of type object to properly capture whatever values we get back from the UI
    attempt: Object,
    //correct is changed accordingly when the attempt is checked
    correct: {
      type: Boolean,
      default: null
    }
  }],

  instructions: {
    type: String,
    default: null,
    required: true
  }

}, { minimize: false });


registerEvents(ProblemSchema);
export default mongoose.model('Problem', ProblemSchema);
