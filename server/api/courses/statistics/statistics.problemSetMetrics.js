export default function problemSetMetricsCalculator() {
  return new Promise(function(resolve, error) {
    resolve({
      description: 'Returns which sets of problems are giving students trouble',
      threshold: 50 // This statistic is going to use a threshold to determine what is "problematic"
    });
  });
}
