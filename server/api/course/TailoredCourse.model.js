'use strict';

import mongoose, {Schema} from 'mongoose';
import Assignment from './assignment.model';
import shared from './../../config/environment/shared';


var TailoredCourseSchema = new Schema({
  
  //grabs information from abstract course
  //such as name and description
  AbstractCourseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AbstractCourse',
    required: true
  },
  subjects: {
    type: String,
    enum: shared.subjects
  },
  categories: {
    type: String,
    enum: shared.categories
  },
  
  //identifies a student enrolled in this course
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //grabs the assignments written for this course
  assignments: [Assignment.schema]

}, { usePushEach: true });

export default mongoose.model('TailoredCourse', TailoredCourseSchema);
