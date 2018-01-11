'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/student', {
    template: '<student></student>',
    authenticate: 'student' //assuming there is a student role
  });
}
