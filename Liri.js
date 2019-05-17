var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

require('dotenv').config();
var keys = require("./keys.js");

var command = process.argv[2];
var request = process.argv[3];

switch(command){
  case "concert-this":

    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
      function(response) {

        for( var i = 0; i<response.data.length; i++){
        console.log("Venue: " + response.data[i].venue.name);
        console.log("location: " + response.data[i].venue.city + ", " +response.data[i].venue.country);
        console.log("date MM/DD/YYYY: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        console.log("<------------------>");
        }
      }
    );


  break;
  case "spotify-this-song":

    var spotify = new Spotify(keys.spotify);
  
    spotify.search({ type: 'track', query: request }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
    console.log(data); 
    });

  break;
  case "movie-this":

    axios.get("http://www.omdbapi.com/?t="+request+"&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
      }
    );

  break;
  case "do-what-it-says":


  break;

}




axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);
