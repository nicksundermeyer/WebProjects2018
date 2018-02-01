'use strict';

import mongoose, {Schema} from 'mongoose';
import Assignment from './assignment.model';
import shared from './../../config/environment/shared';


var TailoredCourseSchema = new Schema({
  //grabs information from abstract course
  //such as name and description
  abstractCourseID: {
    type: Schema.Types.ObjectId,
    ref: 'AbstractCourse'
  },

  //identifies a student enrolled in this course
  studentID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  //subjects and categories must match the enums defined below
  subjects: String, enum: shared.allSubjects,
  categories: String, enum: shared.allCategories,

  //grabs the assignments written for this course
  assignments: [Assignment.schema]

}, { usePushEach: true });

export default mongoose.model('TailoredCourse', TailoredCourseSchema);
