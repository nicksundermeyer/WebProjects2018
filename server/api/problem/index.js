import {Router} from 'express';
import * as controller from './problem.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('student'), controller.index);
router.get('/:id', auth.hasRole('student'), controller.show);
router.post('/', auth.hasRole('teacher'), controller.create);


module.exports = router;
