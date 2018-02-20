'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './Course.events';
import shared from './../../config/environment/shared';
import AbstractAssignment from './AbstractAssignment.model';

var AbstractCourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subjects: {
    type: String,
    enum: shared.allSubjects,
    required: true
  },
  categories: {
    type: String,
    enum: shared.allCategories,
    required: true
  },
  teacherID: { type: mongoose.Schema.Types.ObjectId, default: null },

  //embeded assignments
  assignments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AbstractAssignment',
      default: null
    }]

}, { usePushEach: true });


registerEvents(AbstractCourseSchema);
export default mongoose.model('AbstractCourse', AbstractCourseSchema);
