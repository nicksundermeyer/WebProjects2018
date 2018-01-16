'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './assignment.events';
import Problem from './course.model';


var AssignmentSchema = new Schema({
  problems: {
    subject: String,
    category: [String],
    content: [Problem]
  }
}, {usePushEach: true});


registerEvents(AssignmentSchema);
export default mongoose.model('Assignment', AssignmentSchema);
