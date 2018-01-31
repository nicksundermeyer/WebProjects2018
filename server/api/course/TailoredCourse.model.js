'use strict';

import mongoose, {Schema} from 'mongoose';
import Assignment from './assignment.model';
import shared from './../../config/environment/shared';


var TailoredCourseSchema = new Schema({
  abstractCourseID: { type: Schema.Types.ObjectId, ref: 'AbstractCourse' },
  studentID: { type: Schema.Types.ObjectId, ref: 'User'},
  subjects: String, default: shared.subject,
  categories: String, default: shared.categories,
  assignments: [Assignment.schema]

}, { usePushEach: true });

export default mongoose.model('TailoredCourse', TailoredCourseSchema);
