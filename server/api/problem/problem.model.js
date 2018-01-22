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
    subject: {type: String, default: null},
    category: {type: String, default: null},
    depth: {type: Number, required: true, default: 1},
    problemId: {type: String, required: true, default: null},
    description: {type: Object, default: null},
    solution: {type: Object, required: true, default: null}
  }
}, { minimize: false });


registerEvents(ProblemSchema);
export default mongoose.model('Problem', ProblemSchema);
