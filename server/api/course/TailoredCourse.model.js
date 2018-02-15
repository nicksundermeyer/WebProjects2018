'use strict';

import mongoose, {Schema} from 'mongoose';
import {TailoredAssignment} from './Assignment.model';
import shared from './../../config/environment/shared';


var TailoredCourseSchema = new Schema({
  //grabs information from abstract course
  //such as name and description
  abstractCourseID: {
    type: Schema.Types.ObjectId,
    ref: 'AbstractCourse',
    required:true
  },

  //identifies a student enrolled in this course
  studentID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
    //required:true
  },

  //subjects and categories must match the enums defined below
  subjects:{
    type: String,
    enum: shared.allSubjects,
    required: true
  },
  categories:{
    type: String,
    enum: shared.allCategories,
    required: true
  },


  //grabs the assignments written for this course
  assignments:{
    type:[TailoredAssignment],
    default: null
    //required:true
  }


}, { usePushEach: true });

export default mongoose.model('TailoredCourse', TailoredCourseSchema);
