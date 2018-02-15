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
    template: '<course></course>',
    authenticate: 'student'
  });

  $routeProvider.when('/student/course/:courseId/assignment/:assignmentId', {
    template: '<assignment></assignment>',
    authenticate: 'student'
  });

}
