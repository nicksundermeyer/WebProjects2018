'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './course.events';
import shared from './../../config/environment/shared';

var CourseSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  description: String,
  subjects: [mongoose.Schema.Types.ObjectId],
  categories: String, enum: shared.subject,
  assignments: String, enum: shared.categories,
  maxStudents: {
    type: Number,
    required: true
  },
  enrolledStudents: [mongoose.Schema.Types.ObjectId],

  teacherID: mongoose.Schema.Types.ObjectId

}, { usePushEach: true });


registerEvents(CourseSchema);
export default mongoose.model('Course', CourseSchema);
