'use strict';

import mongoose, {Schema} from 'mongoose';
import Problem from './../problem/problem.model'

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

var TailoredAssignment = new Schema({
  //abstract assignment id
  AbstractAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'abstractAssignmentSchema',
    required: true
  },
  //grabs problems written for this assignment
  //from the problems model
  //problems: [Problem.schema]

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  problems: {
    type: [Problem.schema],
    required: true
  }

}, {usePushEach: true});

export {AbstractAssignment, TailoredAssignment};
