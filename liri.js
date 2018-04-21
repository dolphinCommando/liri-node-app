
require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');
//var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');

// OMDB queryUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=48075365`;

var command = process.argv[2];
var query = '';
for (var i = 3; i<process.argv.length; i++) {
	query += (i>3) ? ('+' + process.argv[i]) : process.argv[i];
}	

var twitterClient = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});

switch(command) {
	case 'my-tweets':
	  tweets();
	  break;
	case 'spotify-this-song':
	  spotify(query);
	  break;
	case 'movie-this':
	  movie(query);
	  break;
	case 'do-what-it-says':
	  doit();
	  break;
}

function tweets() {
	twitterClient.get('statuses/home_timeline', function(error, tweets, response) {
		if(error) throw JSON.stringify(error);
		for(var i = 0; i<20; i++) {
			console.log(`Created at ${tweets[i].created_at}: ${tweets[i].text}`);
		}
	});
}

function spotify() {

}

function movie() {

}

function doit() {

}
/*
function getQuery() {
	var query = '';
	for (var i = 3; i<process.argv.length; i++) {
		query += (i>3) ? ('+' + process.argv[i]) : process.argv[i];
	}	
	return query;
}
*/

function log(data) {
	//fs.appendFile to log.txt
}


