
export function CourseService($http) {
  'ngInject'
  //get all courses
  var Course = {

    getAllCourses() {
      return $http.get('/api/courses/');
    },
//get course info
    getCourseInfo(courseId) {
      return $http.get('/api/courses/' + courseId);
    },
//get info on the course in which the student enrolled
    enrollStudentCourse(courseId, studentId) {
      return $http.post('/api/courses/' + courseId + '/students/' + studentId);
    },
//get tailored course info
    getTailoredCourseInfo(courseId, studentId) {
      return $http.get('/api/courses/' + courseId + '/students/' + studentId);
    },
//get student info
    getStudentInfo() {
      return $http.get('/api/users/me');
    }
  };
  return Course;
}
