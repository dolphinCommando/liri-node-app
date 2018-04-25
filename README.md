# liri-node-app

A command-line application that can search Spotify, search OMDB, display my tweets, or read from a text file of commands.  

## How to use 

Run liri.js in NodeJS from command line. If you do not enter any arguments, liri.js will display a list of available commands and queries.
Commands:
  * my-tweets 
  * spotify-this-song whatever
  * movie-this whatever 
  * do-what-it-says
  
Example:
node liri.js spotify-this-song Never Gonna Give You Up

## The Files

1. liri.js parses commands and queries API's. Use this file to run liri-node-app in Node
2. keys.js creates method for liri.js to use with dotenv
3. random.txt has text commands and queries that execute when the file is read
4. log.txt is a log of previous command calls and of API results
5. package.json stores info about npm modules

## Packages

liri.js uses the following npm packages:
* request
* node-spotify-api
* twitter
* moment (to timestamp the log)
* dotenv (for security)

liri.js uses the keys.js module to store API methods. The Node "fs" package is used for reading files.


