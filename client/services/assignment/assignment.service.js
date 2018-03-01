
export function AssignmentService($http) {
  'ngInject';
  var Assignment = {

    getAssignmentInfo(courseId, studentId, assignmentId) {
      return $http.get('/api/courses/' + courseId + '/students/' + studentId + '/assignments/' + assignmentId);
    }
  };
  return Assignment;
}
