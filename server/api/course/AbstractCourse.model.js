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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    minNumProblems: {
      type: Number,
      required: true
    },
    maxNumProblems: {
      type: Number,
      required: true
    },
    //New problems will be fetched from problem engine
    //existing problems will be fetched from local DB from problem table
    newProblemPercentage: {
      type: Number,
      required: true
    }
  }]

}, { usePushEach: true });


registerEvents(AbstractCourseSchema);
export default mongoose.model('AbstractCourse', AbstractCourseSchema);
