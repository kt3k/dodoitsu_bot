#! /usr/bin/env node

var Twit = require('twit');

var conf = require('./conf.json');

T = new Twit({
    consumer_key: conf.consumerKey,
    consumer_secret: conf.consumerSecret,
    access_token: conf.accessToken,
    access_token_secret: conf.accessTokenSecret,
});

var readStream = function () {
    var stream = T.stream('statuses/filter', {track: 'dodoitsu'});

    stream.on('tweet', function (tweet) {
        console.log(tweet);
        console.log(tweet.text);

        retweet(tweet);
    });
};

var retweet = function (tweet) {
    console.log('statuses/retweet/' + tweet.id_str);
    T.post('statuses/retweet/' + tweet.id_str, {}, function (err, reply) {
        console.log(err);
        console.log(reply);

        console.log('retweeted: ' + tweet.id_str + ': ' + tweet.text);
    });
};

readStream();
