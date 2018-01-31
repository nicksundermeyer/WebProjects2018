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
      type: Number, 
      required: true
    },
    title: String,
    description: String,
    depth: Number,
    subject: String,
    category: String,
    instructions: String,
    attempts:[{
      date: String,
      attempt: String,
      correct: Boolean
    }]
  }
}, { minimize: false });


registerEvents(ProblemSchema);
export default mongoose.model('Problem', ProblemSchema);
