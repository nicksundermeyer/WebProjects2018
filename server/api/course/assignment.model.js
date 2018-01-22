'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './assignment.events';


var AssignmentSchema = new Schema({
  
}, {usePushEach: true});


registerEvents(AssignmentSchema);
export default mongoose.model('Assignment', AssignmentSchema);
