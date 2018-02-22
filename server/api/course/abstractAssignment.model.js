'use strict';

import mongoose, {Schema} from 'mongoose';

var AbstractAssignment = new Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  minNumProblems: {
    type: Number,
    required: true
  },
  maxNumProblems: {
    type: Number,
    required: true
  },
  //New problems will be fetched from problem engine
  //existing problems will be fetched from local DB from problem table
  newProblemPercentage: {
    type: Number,
    required: true
  }

}, {usePushEach: true});

export default mongoose.model('AbstractAssignment', AbstractAssignment);
