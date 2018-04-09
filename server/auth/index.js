'use strict';
<<<<<<< HEAD
=======
console.log("auth/index.js 2");
>>>>>>> 78bc1478bc2775bb5885b13e19b235e47bd45df3

import express from 'express';
import config from '../config/environment';
import User from '../api/users/user.model';

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);

export default router;
