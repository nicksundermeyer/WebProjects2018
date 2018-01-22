'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './assignment.events';


var AssignmentSchema = new Schema({
  problems: {
    subject: String,
    category: [String],
    content: [mongoose.Schema.Types.ObjectId]
  }
}, {usePushEach: true});


registerEvents(AssignmentSchema);
export default mongoose.model('Assignment', AssignmentSchema);
