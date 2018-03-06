'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './course.events';
import shared from './../../config/environment/shared';

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
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AbstractAssignment',
    default: null
  }],

}, { usePushEach: true }, {
  //timestamps in mongoose automatically adds
  //createdAt and updatedAt fields with the type Date
  //for audit purposed in our case
  timestamps: true
});


registerEvents(AbstractCourseSchema);
export default mongoose.model('AbstractCourse', AbstractCourseSchema);
