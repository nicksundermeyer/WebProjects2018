
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
    getCurrentUsersCourses() {
      var id = UserServ.getCurrentUserId();
      return $http.get('/api/users/' + id + '/courses');
    },
    getUsersCourses(id) {
      return $http.get('/api/users/' + id + '/courses');
    },
    promiseTest() {
      return Promise.resolve({
        json: {
          'glossary': {
            'title': 'example glossary',
            'GlossDiv': {
              'title': 'S',
              'GlossList': {
                'GlossEntry': {
                  'ID': 'SGML',
                  'SortAs': 'SGML',
                  'GlossTerm': 'Standard Generalized Markup Language',
                  'Acronym': 'SGML',
                  'Abbrev': 'ISO 8879:1986',
                  'GlossDef': {
                    'para': 'A meta-markup language, used to create markup languages such as DocBook.',
                    'GlossSeeAlso': ['GML', 'XML']
                  },
                  'GlossSee': 'markup'
                }
              }
            }
          }
        }
      });
    }

  };
  return UserServ;
}
