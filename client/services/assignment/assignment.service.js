
export function AssignmentService($http) {
  'ngInject';
  //create assignments returning courses,courseId,studentid,assignmentid
  var Assignment = {

    getAssignmentInfo(courseId, studentId, assignmentId) {
      return $http.get('/api/courses/' + courseId + '/students/' + studentId + '/assignments/' + assignmentId);
    },
    //router.post('/:courseId/students/:studentId/assignments/:assignmentId/problems/:problemId',
    submitSolution(courseId, studentId, assignmentId, problemId, latexSol) {
      return {
        async: function() {
          return $http.post('/api/courses/' + courseId + '/students/' + studentId + '/assignments/' + assignmentId + '/problems/' + problemId,
            {latexSol});
        }
      };
    },
    //Gives info about the problem
    getProblemInfo(courseId, studentId, assignmentId, problemId) {
      return $http.get('/api/courses/' + courseId + '/students/' + studentId + '/assignments/' + assignmentId + '/problems/' + problemId);
    }
  };
  return Assignment;
}
