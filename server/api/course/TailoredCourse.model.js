'use strict';

import mongoose, {Schema} from 'mongoose';
import Assignment from './assignment.model';
import shared from './../../config/environment/shared';


var TailoredCourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  subjects: String, default: shared.subject,
  categories: String, default: shared.categories,
  teacherID: mongoose.Schema.Types.ObjectId,
  assignments: [Assignment.schema]

}, { usePushEach: true });

export default mongoose.model('TailoredCourse', TailoredCourseSchema);
