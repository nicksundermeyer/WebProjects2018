'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'student', 'teacher', 'researcher', 'admin'],

  //categories and subject are organized by index, that is that subject[i] has corresponding categories at categories[i]
  subject: ['booleanLogic', 'algebra'],
  categories: [['or', 'and', 'not', 'implication'], ['addition', 'subtraction', 'multiplication', 'division', 'linearEquations', 'quadraticEquations']]
};
