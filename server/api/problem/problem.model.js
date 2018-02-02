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

    title:{
      type: String,
      required: true
    },

    description:{
      type: String,
      required:true
    },

    depth:{
      type: Number,
      required: true
    },

    subject:{
      type:String,
      required:true
    },

    category:{
      type:String,
      required: true
    },

    instructions:{
      type:String,
      required:true
    },
    attempts:{
      type:[{
        date: String,
        attempt: String,
        correct: Boolean
      }],
      required:true
    }
  }
}, { minimize: false });


registerEvents(ProblemSchema);
export default mongoose.model('Problem', ProblemSchema);
