'use strict';

import mongoose, {Schema} from 'mongoose';
import Problem from './../problem/problem.model';

var TailoredAssignment = new Schema({
  //abstract assignment id
  AbstractAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AbstractAssignment',
    required: true
  },
  //grabs problems written for this assignment
  //from the problems model
  //problems: [Problem.schema]
  problems: {
    type: [Problem.schema],
    required: true
  }

}, {
  //timestamps in mongoose automatically adds
  //createdAt and updatedAt fields with the type Date
  //for audit purposed in our case
  timestamps: true
}, {usePushEach: true});

export default mongoose.model('TailoredAssignment', TailoredAssignment);
