require("dotenv").config();
const keys = require('./keys.js');
const twitter = require('twitter');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi(keys.spotify);
let client = new twitter(keys.twitter);
let params = {
    screen_name: 'liribot2018'
};

let myTweets = () => {
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(`Tweet #${[i] +1} : ${tweets[i].text}`);
            }
        }
    });
}

let spotifyThisSong = () => {
    spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
        .then(function (data) {
            console.log('Artist information', data.body);
        }, function (err) {
            console.error(err);
        });
    spotifyApi.getAlbum(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
        .then(function (data) {
            console.log('Albums information', data.body);
        }, function (err) {
            console.error(err);
        });
}

let movieThis = () => {

}

let doWhatItSays = () => {

}

let switchKey = process.argv[2];

switch (switchKey) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
    console.log("Please enter a valid command (my-tweets, spotify-this-song, movie-this, do-what-it-says).");
        break;
}