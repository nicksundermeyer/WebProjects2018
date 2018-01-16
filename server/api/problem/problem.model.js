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
    subject: {type: String, required: true, default: null},
    category: {type: String, required: true, default: null},
    depth: {type: Number, required: true, default: 1},
    'problem id': {type: String, required: true, default: null}
  }
});


registerEvents(ProblemSchema);
export default mongoose.model('Problem', ProblemSchema);
