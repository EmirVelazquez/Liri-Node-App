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
// Code to require fs Node package for reading and writing text files
var fs = require("fs");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Variable to hold user input for liri to execute
var userInput = process.argv[2];
// Variable to hold user (artist/band name) || (song name) || (movie name)
var userSearch = process.argv.slice(3).join("+").toLowerCase();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Code block for Bands in Town here npm using Axios
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
                    console.log("-----------------------------------------------");
                    console.log("Name of the venue is: " + response.data[i].venue.name);
                    console.log("The venue is located in: " + response.data[i].venue.city);
                    console.log("Date of the Event is: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
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
// Code block for Spotify API npm
else if (userInput === "spotify-this-song") {
    // Code to access your spotify key information
    var spotify = new Spotify(keys.spotify);
    if (userSearch === "") {
        userSearch = "The Sign by Ace of Base";
        spotify
            .request("https://api.spotify.com/v1/search?query=" + userSearch + "&type=track&offset=0&limit=5")
            .then(function (response) {
                let songNumber = 1;
                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Song Number: " + songNumber);
                    console.log("-----------------------------------------------");
                    console.log("Artist: " + response.tracks.items[i].artists[0].name);
                    console.log("The song name is: " + response.tracks.items[i].name);
                    console.log("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url);
                    console.log("The album containing this song is: " + response.tracks.items[i].album.name);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("\n")
                    songNumber++;
                }
            })
            // Should any error occur, it will be logged to the terminal
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        spotify
            .request("https://api.spotify.com/v1/search?query=" + userSearch + "&type=track&offset=0&limit=5")
            .then(function (response) {
                let songNumber = 1;
                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Song Number: " + songNumber);
                    console.log("-----------------------------------------------");
                    console.log("Artist: " + response.tracks.items[i].artists[0].name);
                    console.log("The song name is: " + response.tracks.items[i].name);
                    console.log("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url);
                    console.log("The album containing this song is: " + response.tracks.items[i].album.name);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("\n")
                    songNumber++;
                }
            })
            // Should any error occur, it will be logged to the terminal
            .catch(function (error) {
                console.log(error);
            });
    }
}
// Code block for omdb movie api
else if (userInput === "movie-this") {
    if (userSearch === "") {
        userSearch = "Mr. Nobody";
        axios
            .get("http://www.omdbapi.com/?t=" + userSearch + "&apikey=trilogy")
            .then(function (response) {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Movie title: " + response.data.Title);
                console.log("-----------------------------------------------");
                console.log("Year released: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log(response.data.Ratings[1].Source + " gave this movie a " + response.data.Ratings[1].Value + " rating.");
                console.log("Country Produced: " + response.data.Country);
                console.log("Language/s: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Main Actors/Actresses: " + response.data.Actors);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            });
    }
    else {
        axios
            .get("http://www.omdbapi.com/?t=" + userSearch + "&apikey=trilogy")
            .then(function (response) {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Movie title: " + response.data.Title);
                console.log("-----------------------------------------------");
                console.log("Year released: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log(response.data.Ratings[1].Source + " gave this movie a " + response.data.Ratings[1].Value + " rating.");
                console.log("Country Produced: " + response.data.Country);
                console.log("Language/s: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Main Actors/Actresses: " + response.data.Actors);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            });
    }
}
// Code block for do what it says
else if (userInput === "" || userInput !== "concert-this" || userInput !== "spotify-this-song" || userInput !== "movie-this") {
    console.log("Liri does not recognize your input, she has gone ahead and inputed a search for you because she's great like that.");
    fs
        .readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            // Places text of random.txt inside an array, then splits the contents by commas
            var dataArr = data.split(",");

            let userInput = dataArr[0];
            let userSearch = dataArr[1].replace(/\"/g, "")

            if (userInput === "spotify-this-song") {
                // Code to access your spotify key information
                var spotify = new Spotify(keys.spotify);
                spotify
                    .request("https://api.spotify.com/v1/search?query=" + userSearch + "&type=track&offset=0&limit=5")
                    .then(function (response) {
                        let songNumber = 1;
                        for (var i = 0; i < response.tracks.items.length; i++) {
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                            console.log("Song Number: " + songNumber);
                            console.log("-----------------------------------------------");
                            console.log("Artist: " + response.tracks.items[i].artists[0].name);
                            console.log("The song name is: " + response.tracks.items[i].name);
                            console.log("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url);
                            console.log("The album containing this song is: " + response.tracks.items[i].album.name);
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                            console.log("\n")
                            songNumber++;
                        }
                    })
                    // Should any error occur, it will be logged to the terminal
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
}
else {
    console.log("You somehow managed to break Liri, that's not cool.");
}





