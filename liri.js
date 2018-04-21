require("dotenv").config();
var keys = require('keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

queryUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=48075365`;
