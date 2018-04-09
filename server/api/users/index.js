'use strict';
<<<<<<< HEAD
=======
console.log('users index.js');
>>>>>>> 78bc1478bc2775bb5885b13e19b235e47bd45df3
import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id/courses', auth.hasRole('student'), controller.getUsersCourses);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
