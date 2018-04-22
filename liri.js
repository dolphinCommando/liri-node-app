
require("dotenv").config();
var request = require("request");
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

liriCommand(command, query);


function liriCommand(command, query) {
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

}

function tweets() {
	twitterClient.get('statuses/home_timeline', function(error, tweets, response) {
		if(error) throw JSON.stringify(error);
		var available = (tweets.length<20) ? tweets.length : 20;
		for(var i = 0; i<available; i++) {
			console.log(`Created at ${tweets[i].created_at}: ${tweets[i].text}`);
		}
	});
}

function spotify(search) {
  spotifyClient.search({ type: 'track', query: search}, function(err, data) {
    if (err) throw (JSON.stringify(err));
	var top = data.tracks.items[0];
    console.log('Track name: ' + top.name);
	console.log('Artist name: ' + top.artists[0].name);
	console.log('Album name: ' + top.album.name);
	console.log('Listen in Spotify: ' + top.external_urls.spotify);
  });

}

function movie(search) {
  var queryUrl = 'http://www.omdbapi.com/?t=' + search + '&plot=short&i=tt3896198&apikey=48075365';
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
	  console.log("Year released: " + JSON.parse(body).Year);
	  console.log("IMDB score: " + JSON.parse(body).Ratings[0].Value);
	  console.log("Rotten Tomatoes score: " + JSON.parse(body).Ratings[1].Value);
	  console.log("Country where produced: " + JSON.parse(body).Country);
	  console.log("Language: " + JSON.parse(body).Language);
	  console.log("Plot: " + JSON.parse(body).Plot);
	  console.log("Actors: " + JSON.parse(body).Actors); 
    }
	else {
	  console.log(error);
	}
  });
}

function doit() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }  
	data=data.split(',');
	for (var i = 0; i<(data.length-1); i+=2) {
      liriCommand(data[i], data[i+1]);
	} 
  });
}


function log(data) {
	//fs.appendFile to log.txt
}

function help() {
console.log(`
-------------------------------
node liri.js <command> <query>
-------------------------------
Options for <command>:	
  my-tweets                            // Displays my last 20 tweets	  
  spotify-this-song <your-track-here> // Search Spotify for track	  
  movie-this <your-title-here>       // Search OMDB for movie 	  
  do-what-it-says                   // Reads random.txt and executes command
`);
}


