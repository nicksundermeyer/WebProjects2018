'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './course.events';
import Assignment from './assignments.model';


var TailoredCourseSchema = new Schema({

  subject: {
    type: String,
    required: true
  },

  teacherID: mongoose.Schema.Types.ObjectId,

  assignments: [Assignment]

}, { usePushEach: true });




TailoredCourseSchema.methods = {
    /**
    * Populate Assignments with the assignments from the AbstractCourse
    *
    * @param {AbstractCourse} abstractCourse
    */
    populateAssignments(courseAssignments) {



    }
 }

registerEvents(TailoredCourseSchema);
export default mongoose.model('TailoredCourse', TailoredCourseSchema);
