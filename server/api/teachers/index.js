'use strict';

import { Router } from 'express';
import * as controller from './teacher.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get(
  '/:id/statistics/courseCompletionPercentage',
  auth.hasRole('teacher'),
  controller.courseCompletionPercentage
);
router.get(
  '/:id/statistics/studentDistribution',
  auth.hasRole('teacher'),
  controller.studentDistribution
);
router.get(
  '/:id/statistics/failingStudents',
  auth.hasRole('teacher'),
  controller.failingStudents
);
router.get(
  '/:id/statistics/overachievingStudents',
  auth.hasRole('teacher'),
  controller.overachievingStudents
);
router.get(
  '/:id/statistics/problemSetMetrics',
  auth.hasRole('teacher'),
  controller.problemSetMetrics
);
router.get(
  '/:id/statistics/categoryMetrics',
  auth.hasRole('teacher'),
  controller.categoryMetrics
);
router.get(
  '/:id/statistics/dataCorrelations',
  auth.hasRole('teacher'),
  controller.dataCorrelations
);

module.exports = router;
