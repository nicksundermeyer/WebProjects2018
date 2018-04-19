'use strict';

import express from 'express';
import config from '../config/environment';
import User from '../api/users/user.model';
// Passport Configuration
require('./local/passport').setup(User, config);
var router = express.Router();
router.use('/local', require('./local').default);
export default router;
