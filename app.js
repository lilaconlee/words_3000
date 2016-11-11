var twit = require('twit');
var env = require('node-env-file');
var data = require('./words.json');

env(__dirname + '/.env');

var t = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function randomEntry() {
  var words = Object.keys(data);
  var word = words[rand(words.length)];
  var entry = data[word];

  return word + ": " + entry;
}

function rand(n) {
  return Math.floor(n * Math.random());
}

function tweet() {
  var status = randomEntry();
  t.post('statuses/update', { status: status }, function(err, data, response) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('posted', status);
  });
}

tweet();
