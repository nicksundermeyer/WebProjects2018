'use strict';
//exports the function to get the route and imports the $routeProvider into the route function
export default function routes($routeProvider) {
  'ngInject';
  //sets the route providers corresponding controllers and templates
  $routeProvider.when('/login', {
    template: require('./login/login.html'),
    controller: 'LoginController',
    controllerAs: 'vm'
  })
    .when('/logout', {
      name: 'logout',
      referrer: '/',
      template: '',
      controller($location, $route, Auth) {
        var referrer = $route.current.params.referrer || $route.current.referrer || '/';
        Auth.logout();
        $location.path(referrer);
      }
    })
    .when('/signup', {
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm'
    })
    .when('/settings', {
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
