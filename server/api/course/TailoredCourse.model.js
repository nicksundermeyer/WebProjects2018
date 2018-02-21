'use strict';

import mongoose, {Schema} from 'mongoose';
import TailoredAssignment from './TailoredAssignment.model';
import shared from './../../config/environment/shared';


var TailoredCourseSchema = new Schema({
  //grabs information from abstract course
  //such as name and description
  abstractCourseID: {
    type: Schema.Types.ObjectId,
    ref: 'AbstractCourse',
    default: null,
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
  },
  categories:{
    type: String,
    enum: shared.allCategories
  },

  //grabs the assignments written for this course
  assignments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TailoredAssignment',
    default: null
  }]



}, { usePushEach: true });

export default mongoose.model('TailoredCourse', TailoredCourseSchema);
