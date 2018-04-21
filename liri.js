require("dotenv").config();
var fs = require('fs');
var keys = require('keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

queryUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=48075365`;

var command = process.argv[2];


switch(command) {
	case 'my-tweets':
	  tweets();
	  break;
	case 'spotify-this-song':
	  spotify(getQuery());
	  break;
	case 'movie-this':
	  movie(getQuery());
	  break;
	case 'do-what-it-says':
	  doit();
	  break;
}

function tweets() {

}

function spotify() {

}

function movie() {

}

function doit() {

}

function getQuery() {
	var query = '';
	for (var i = 3; i<process.argv.length; i++) {
		query += (i>3) ? ('+' + process.argv[i]) : process.argv[i];
	}	
	return query;
}

function log(data) {
	//fs.appendFile to log.txt
}


