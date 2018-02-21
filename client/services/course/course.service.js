
export function CourseService($http) {
  'ngInject'
  var Course = {

    getAllCourses() {
      return $http.get('/api/courses/');
    },

    getCourseInfo(courseId) {
      return $http.get('/api/courses/' + courseId);
    },

    enrollStudentCourse(courseId, studentId) {
      return $http.post('/api/courses/' + courseId + '/students');
    },

    getTailoredCourseInfo(courseId, studentId) {
      return $http.get('/api/courses/' + courseId + '/students/' + studentId);
    },

    getStudentInfo() {
      return $http.get('/api/users/me');
    }
  };
  return Course;
}
