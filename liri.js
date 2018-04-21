
require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');
//var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

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

var spotifyClient = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});

switch(command) {
	case 'my-tweets':
	  tweets();
	  break;
	case 'spotify-this-song':
	  (query==='') ? spotify('The+Sign') : spotify(query);
	  break;
	case 'movie-this':
	  movie(query);
	  break;
	case 'do-what-it-says':
	  doit();
	  break;
	case undefined:
	  help()
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

function spotify(request) {
  spotifyClient.search({ type: 'track', query: request}, function(err, data) {
    if (err) throw (JSON.stringify(err));
	var top = data.tracks.items[0];
    console.log('Track name: ' + top.name);
	console.log('Artist name: ' + top.artists[0].name);
	console.log('Album name: ' + top.album.name);
	console.log('Listen in Spotify: ' + top.external_urls.spotify);
	/* Artist name: data.tracks.items[0].artists[0].name */ 
	/* Album name: data.tracks.items[0].album.name */
	/* Spotify link: data.tracks.items[0].external_urls.spotify */
	/* Track name: data.tracks.items[0].name */
  });

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

function help() {
console.log(`
---------------------------
node liri.js command
---------------------------
values for command:	

my-tweets                            // Displays my last 20 tweets	  
spotify-this-song your-track-here   // Search Spotify for track	  
movie-this your-title-here         // Search OMDB for movie 	  
do-what-it-says                   // Reads random.txt and executes command

`);
}


