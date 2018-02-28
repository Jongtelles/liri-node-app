require("dotenv").config();
const keys = require('./keys.js');
const twitter = require('twitter');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

let spotifyApi = new SpotifyWebApi({
    clientId: keys.spotify.id,
    clientSecret: keys.spotify.secret
});

// spotifyApi.clientCredentialsGrant()
//     .then((data) => {
//         spotifyApi.setAccessToken(data.body['access_token']);
//     }, (err) => {
//         console.log('Something went wrong when retrieving an access token', err);
//     });

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
let nodeArgs = process.argv;
let searchInput = "";

let spotifyThisSong = () => {

    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            searchInput = searchInput + "+" + nodeArgs[i];
        } else {
            searchInput += nodeArgs[i];
        }
    }
    spotifyApi.search(searchInput, ['track'], {
            limit: 5,
            offset: 1
        })
        .then((data) => {
            console.log(data.body);
        }, (err) => {
            console.error(err);
        });
}

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

let doWhatItSays = () => {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) {
            return console.log(error);
        }
        let dataArr = data.split(",");
        console.log(`${dataArr[0]} ${dataArr[1]}`);
    });
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
        console.log(`Please enter a valid command (my-tweets, spotify-this-song, movie-this, do-what-it-says).`);
        break;
}