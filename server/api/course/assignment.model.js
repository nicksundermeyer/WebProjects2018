'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './assignment.events';
import Problem from '../problem/problem.model';


var AssignmentSchema = new Schema({
  problems: {
    subject: String,
    category: [String],
    content: [Problem]
  }
}, {usePushEach: true});


registerEvents(AssignmentSchema);
export default mongoose.model('Assignment', AssignmentSchema);

AssignmentSchema.methods = {

    /**
    * Populate Assignments with the assignments from the AbstractCourse
    *
    * @param {AbstractCourse} abstractCourse
    */
    populateProblems() {


    }


}


