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


    //Can add this back when problemId is fixed on gen
    // problemId: {
    //   type: String,
    //   default: null,
    //   required: true
    // },

    description:{
      type: Object,
      default: null,
      required:true
    },

    depth:{
      type: Number,
      default: 1,
      required: true
    },

    subject:{
      type:String,
      default: null,
      required:true
    },

    category:{
      type:String,
      default: null,
      required: true
    },

    solution: {
      type: Object,
      default: null,
      required: true
    },

    instructions:{
      type:String,
      default: null,
      required:true
    },

    //Can add this when we implement the functionality
    // attempts:{
    //   type:[{
    //     date: String,
    //     attempt: String,
    //     correct: Boolean
    //   }],
    //   required:true
    // }

  }
}, { minimize: false });


registerEvents(ProblemSchema);
export default mongoose.model('Problem', ProblemSchema);
