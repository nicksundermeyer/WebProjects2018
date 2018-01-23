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
  subjects: String, enum: shared.subject,
  categories: String, enum: shared.categories,
  maxStudents: {
    type: Number,
    required: true,
    default: -1 //default is -1 for unlimited number of students
  },
  enrolledStudents: [mongoose.Schema.Types.ObjectId],
  teacherID: mongoose.Schema.Types.ObjectId,

  assignments: [{
    minNumProblems: Number,
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


registerEvents(CourseSchema);
export default mongoose.model('Course', CourseSchema);
