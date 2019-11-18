# Liri Node App

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## Technologies Used
- JavaScript
- Node.js
- RESTful API Calls
  1. Spotify API
  2. OMDB API
  3. Bands In Town API
- Terminal to run app
- NPM's

## What Liri can do

* Search Spotify for songs.
* Bands in Town for concerts.
* OMBD for movies.
* Additionally, if the user does not search for anything, Liri will automatically make a search for the user

### Organization in liri.js file

1. Code to required for npm packages used.
2. Code to hold user input and searches
3. If else code that executes app based off the user input

![](assets/organization.gif)

### How To run app

1. App has to be run on the command terminal
2. There are four inputs that a user can type in terminal for Liri to execute
  #### Search Bands in Town for concerts/events.
  **User Inputs:** $ node liri.js concert-this 'artist name or band name'
  ![](assets/concertExample.gif)
  #### Search Spotify for songs.
  **User Inputs:** $ node liri.js spotify-this-song 'song name'
  ![](assets/spotifyExample.gif)
  #### Search OMBD for movies.
  **User Inputs:** $ node liri.js movie-this 'movie name'
  ![](assets/movieExample.gif)
  #### Search with missing field
  **User Inputs:** $ node liri.js
  ![](assets/noInput.gif) 
3. Each time user inputs a command for Liri to run, she displays the result data on the terminal