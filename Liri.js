var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require("fs");

require('dotenv').config();
var keys = require("./keys.js");


var command = process.argv[2];
var request = process.argv[3];

function run (){

switch(command){
  case "concert-this":

    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
      function(response) {

        for( var i = 0; i<response.data.length; i++){
        console.log("Venue: " + response.data[i].venue.name);
        console.log("location: " + response.data[i].venue.city + ", " +response.data[i].venue.country);
        console.log("date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
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
      for( var i = 0; i<5; i++){
      console.log("Artist: "+data.tracks.items[i].artists[0].name); 
      console.log("Song: "+data.tracks.items[i].name); 
      console.log("URL: "+data.tracks.items[i].href); 
      console.log("Album: "+data.tracks.items[i].album.name); 
      console.log("<------------------->"); 
      }
    });

  break;
  case "movie-this":

    axios.get("http://www.omdbapi.com/?t="+request+"&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log(" Title: " + response.data.Title);
        console.log(" Year: " + response.data.Year);
        console.log(" IMDB Rating: " + response.data.Ratings[0].Value);
        console.log(" Roten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log(" Country: " + response.data.Country);
        console.log(" Language: " + response.data.Language);
        console.log(" Plot: " + response.data.Plot);
        console.log(" Director: " + response.data.Director);
        console.log(" Actors: " + response.data.Actors);
        console.log("<---------------------------------->")
      }
    );

  break;
  case "do-what-it-says":
   fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
      var random = data.split(',');
      command = random[0];
      request = random[1];
      run();
    });


  break;
}
};

run()