'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/student', {
    template: '<student></student>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/courseDiscovery', {
    template: '<course-discovery></course-discovery>',
    authenticate: 'student'
  });
}
