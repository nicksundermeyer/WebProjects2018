'use strict';

import mongoose, {Schema} from 'mongoose';
import shared from './../../config/environment/shared';
import Problem from './../problem/problem.model'
import AbstractCourse from './AbstractCourse.model';

var AssignmentSchema = new Schema({
  //abstract assignment id
  AbstractAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AbstractCourse.assignments',
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

}, { usePushEach: true });

export default mongoose.model('Assignment', AssignmentSchema);
