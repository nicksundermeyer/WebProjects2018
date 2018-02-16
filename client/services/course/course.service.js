
export function CourseService($http) {
  'ngInject'
  var Course = {

    getAllCourses() {
      return $http.get('/api/courses/');
    },

    getCourseInfo(courseId) {
      return $http.get('/api/courses/' + courseId);
    },

    enrollStudentCourse(courseId) {
      return $http.post('/api/courses/' + courseId + '/students');
    },

    getTailoredCourseInfo(courseId, studentId) {
      return $http.get('/api/courses' + courseId + '/student/' + studentId);
    },

    getStudentInfo() {
      return $http.get('/api/users/me');
    }
  };
  return Course;
}
