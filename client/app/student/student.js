'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {
    template: '<stundent></stundent>'
  });
}
