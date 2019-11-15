// Code to read and set any environment variables with the dotenv package
require("dotenv").config();
// Code required to import the `keys.js` file and then stored it in a variable
var keys = require("./keys.js");
// Code to access your key information
var spotify = new spotify(keys.spotify);