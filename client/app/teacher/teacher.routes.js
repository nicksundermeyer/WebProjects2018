'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/teacher', {
    template: '<teacher></teacher>',
    authenticate: 'teacher' //assuming there is a teacher role
  });
}
