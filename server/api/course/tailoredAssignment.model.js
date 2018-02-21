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

}, {usePushEach: true});

export default mongoose.model('TailoredAssignment', TailoredAssignment);
