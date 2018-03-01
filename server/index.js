//imports
const express = require("express");
const axios = require("axios");
const path = require('path');

//configuration
require("dotenv").config();
const { API_KEY } = process.env;
const { GOOGLEAPI_KEY } = process.env;


//creation of stuff
const serverApp = express();
const port = process.env.PORT || 5000;

serverApp.use(express.static('Client/build'));

serverApp.get("/forecast/:lat,:lon", function(request, response) {
  const { lat, lon } = request.params;
  const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}`;
  axios
    .get(url)
    .then(res => {
      response.status(200).json(res.data);
    })
    .catch(err => {
      response.status(500).json({
        msg: "your stuff is broke."
      });
    });
});

serverApp.get("/forecast/location/:city,:state", function(request, response) {
  const { city, state } = request.params;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}&key=${GOOGLEAPI_KEY}`;
  axios
    .get(url)
    .then(res => {
      response.status(200).json(res.data);
    })
    .catch(err => {
      console.log('error', err);
      response.status(500).json({
        msg: "your stuff is broke.",
        error: err
      });
    });
});

serverApp.get('*', (request, response) => {
     response.sendFile('index.html', {root: path.resolve('Client/build')});
  });
serverApp.listen(port, () => {
  console.log("now listening on port ${port}");
});
