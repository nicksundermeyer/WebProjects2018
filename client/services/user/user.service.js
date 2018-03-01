
export function UserService($http) {
  'ngInject';
  var UserServ = {
    getCurrentUser() {
      return $http.get('/api/users/me');
    },
    getCurrentUserId() {
      $http.get('/api/users/me').then(result => {
        return result.data._id;
      });
    },
    getUser(id) {
      return $http.get('/api/users/' + id);
    },
    getAllUsers() {
      //must have admin or higher
      return $http.get('/api/users/');
    },
    /*getCurrentUsersCourses() {
      var id = UserServ.getCurrentUserId();
      return $http.get('/api/users/' +  + '/courses');
    },*/
    getUsersCourses(id) {
      return $http.get('/api/users/' + id + '/courses');
    }
  };
  return UserServ;
}
