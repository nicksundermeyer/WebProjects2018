'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/student/course/:id', {
    template: '<course> </course>'
  });
}
