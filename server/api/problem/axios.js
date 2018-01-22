const axios = require("axios");
const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
axios
  .post(url)
  .then(response => {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
  })
  .catch(error => {
    console.log(error);
  });
