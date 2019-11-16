// Code to read and set any environment variables with the dotenv package
require("dotenv").config();
// Code required to import the `keys.js` file and then stored it in a variable
var keys = require("./keys.js");
// Code to require axios npm
var axios = require("axios");
// Code to require moment npm
var moment = require("moment");
// Code to require spotify api npm
var Spotify = require("node-spotify-api");

// Variable to hold user input for liri to execute
var userInput = process.argv[2];
// Variable to hold user (artist/band name) || (song name) || (movie name)
var userSearch = process.argv.slice(3).join("");

// Command for Bands in Town here
if (userInput === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data.length === 0) {
                console.log("Sorry I was unable to find any results for this artist or band.");
            }
            else {
                let eventNumber = 1;
                for (var i = 0; i < response.data.length; i++) {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Event Number: " + eventNumber);
                    console.log("Name of the venue is: " + response.data[i].venue.name);
                    console.log("The venue is located in: " + response.data[i].venue.city);
                    console.log("Date of the Event is: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
                    console.log("\n")
                    eventNumber++;
                }
            }
        })
        // Should any error occur, it will be logged to the terminal
        .catch(function (error) {
            console.log(error);
        });
}
else if (userInput === "spotify-this-song") {
    // Code to access your spotify key information
    var spotify = new Spotify(keys.spotify);
    spotify
        .request("https://api.spotify.com/v1/search?query=" + userSearch + "&type=track&offset=0&limit=5")
        .then(function (response) {
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("The song name is: " + response.tracks.items[0].name);
            console.log("Here is a song preview from Spotify: " + response.tracks.items[0].preview_url);
            console.log("The album containing this song is: " + response.tracks.items[0].album.name);
        })
        // Should any error occur, it will be logged to the terminal
        .catch(function (error) {
            console.log(error);
        });
}