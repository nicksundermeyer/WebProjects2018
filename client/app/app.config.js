'use strict';

/*@ngInject*/
export function routeConfig($routeProvider, $locationProvider) {
  'ngInject';

  $routeProvider.otherwise({
    resolveRedirectTo: Auth => {
      'ngInject';
      return Auth.isLoggedIn()
        .then(role => {
          switch (role) {
          case 'student':
            return '/student';
          default:
            return '/';
          }
        });
    }
  });

  $locationProvider.html5Mode(true);
}
