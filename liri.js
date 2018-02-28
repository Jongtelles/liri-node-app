require("dotenv").config();
const keys = require('./keys.js');
const twitter = require('twitter');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi({
    clientId: keys.spotify.id,
    clientSecret: keys.spotify.secret
});
let client = new twitter(keys.twitter);
let params = {
    screen_name: 'liribot2018'
};

let myTweets = () => {
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(`Tweet #${[i]}: ${tweets[i].text}`);
            }
        }
    });
}

// spotifyApi.clientCredentialsGrant()
//     .then(function (data) {
//         console.log('The access token expires in ' + data.body['expires_in']);
//         console.log('The access token is ' + data.body['access_token']);

//         // Save the access token so that it's used in future calls
//         spotifyApi.setAccessToken(data.body['access_token']);
//     }, function (err) {
//         console.log('Something went wrong when retrieving an access token', err.message);
//     });

// let spotifyThisSong = () => {
//     let searchInput = process.argv[3];
//     spotifyApi.search(searchInput, ['track'], {
//             limit: 5,
//             offset: 1
//         })
//         .then(function (data) {
//             console.log(data.body);
//         }, function (err) {
//             console.error(err);
//         });
// }

let nodeArgs = process.argv;
let movieName = "";

let movieThis = () => {
    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    let queryUrl = `https://www.omdbapi.com/?t=${movieName}&apikey=trilogy`;
    request(queryUrl, (error, response, body) => {
        if (!error) {
            console.log(

`Title: ${JSON.parse(body).Title}
Year: ${JSON.parse(body).Year}
IMDB Rating: ${JSON.parse(body).imdbRating}
Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
Country: ${JSON.parse(body).Country}
Language: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}`
            );
        } else {
            console.log(error);
        }
    });
}
// let doWhatItSays = () => {

// }

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