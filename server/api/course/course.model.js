'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './course.events';


var CourseSchema = new Schema({

  subject: {
    type: String,
    required: true
  },


  maxStudents: {
    type: Number,
    required: true
  },

  enrolledStudents: {
    type: [mongoose.Schema.Types.ObjectId]
  },

  teacherID: mongoose.Schema.Types.ObjectId

  //assignment

}, { usePushEach: true });


registerEvents(CourseSchema);
export default mongoose.model('Course', CourseSchema);
