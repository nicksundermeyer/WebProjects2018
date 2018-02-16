
export function AssignmentService($http) {
  'ngInject';
  var Assignment = {

    getAssignmentInfo(assignmentId) {
      return $http.get('/api/courses/mycourses/assignments/' + assignmentId);
    }
  };
  return Assignment;
}
