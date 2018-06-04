export default function categoryMetricsCalculator() {
  return new Promise(function(resolve, error) {
    resolve({
      description: 'Which problem categories are giving students trouble',
      threshold: 50 // This stat is going to need to respond to user preferences
    });
  });
}
