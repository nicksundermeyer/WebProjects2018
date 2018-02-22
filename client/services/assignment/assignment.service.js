
export function AssignmentService($http) {
  'ngInject';
  var Assignment = {

    getAssignmentInfo(courseId, assignmentId) {
      return $http.get('/api/courses/' + courseId + '/assignments/' + assignmentId);
    }
  };
  return Assignment;
}
