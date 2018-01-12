'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './course.events';


let nameSchema = Schema({

  firstName: {type: String, required: true},
  lastName: {type: String, required: true}

});



var CourseSchema = new Schema({

  category: {
    type: String,
    required: true
  },

  teacher: {
    name: {type: nameSchema, required: true},
    teacherID: {type: mongoose.Schema.Types.ObjectId}
  },

  maxStudents: {
    type: Number,
    required: true
  },

  enrolledStudents: {
    type: [mongoose.Schema.Types.ObjectId]
  }


  //assignment

});


registerEvents(CourseSchema);
export default mongoose.model('Course', CourseSchema);
