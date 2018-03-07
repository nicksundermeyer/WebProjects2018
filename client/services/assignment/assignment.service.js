
export function AssignmentService($http) {
  'ngInject';
  var Assignment = {

    getAssignmentInfo(courseId, studentId, assignmentId) {
      return $http.get('/api/courses/' + courseId + '/students/' + studentId + '/assignments/' + assignmentId);
    },
    //router.post('/:courseId/students/:studentId/assignments/:assignmentId/problems/:problemId',
    submitSolution(courseId, studentId, assignmentId, problemId, latexSol) {
      return $http.post('/api/courses/' + courseId + '/students/' + studentId + '/assignments/' + assignmentId + '/problems/' + problemId,
        {latexSol}).then(
        function(response) {
          console.log('success');
          console.log(response);
        },
        function(response) {
          console.log('failure');
          console.log(response);
        }
      );
    }
  };
  return Assignment;
}
