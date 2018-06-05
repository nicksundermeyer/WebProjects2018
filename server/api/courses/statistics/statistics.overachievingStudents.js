export default function overachievingStudents() {
  return new Promise(function(resolve, error) {
    resolve({
      description:
        'Returns a group of students with grades above some threshold',
      threshold: 50 // this statistic will use a threshold from the user's preferences
    });
  });
}
