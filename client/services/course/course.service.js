
export function CourseService($http) {
  'ngInject'
  var Course = {
    


    getStudentInfo () {
      return $http.get('/api/users/me')
    }
  };
  return Course;
}
