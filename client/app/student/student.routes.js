'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/student', {
    template: '<student></student>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/course', {
    template: '<course-discovery></course-discovery>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/course/:id', {
    // an example route for course detail page
  });

  $routeProvider.when('/student/course/:courseId/assignment/:assignmentId', {
    template: '<assignment></assignment>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/course/:courseId/assignment/:assignmentId/problem/:problemId', {
    template: '<assignment></assignment>',
    authenticate: 'student'
  });

}
