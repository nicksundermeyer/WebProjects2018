'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/student', {
    template: '<student></student>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/courses', {
    template: '<course-discovery></course-discovery>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/courses/:id', {
    // an example route for course detail page
  });
}
