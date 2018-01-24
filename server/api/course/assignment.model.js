'use strict';

import mongoose, {Schema} from 'mongoose';
import shared from './../../config/environment/shared';
import Problem from './../problem/problem.model'

var AssignmentSchema = new Schema({
  minNumProblems: Number,
  maxNumProblems: {
    type: Number,
    required: true
  },
  newProblemPercentage: {
    type: Number,
    required: true
  },
  problems: [Problem.schema]


}, { usePushEach: true });

export default mongoose.model('Assignment', AssignmentSchema);
