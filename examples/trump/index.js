const Markov = require('../..');
const runner = require('../runner');
const fs = require('fs');
const Twit = require('twit');
const unescape = require('unescape');
const bigInt = require('big-integer');

const keys = JSON.parse(fs.readFileSync(`${__dirname}/keys.json`).toString());

const t = new Twit({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token: keys.access_token,
  access_token_secret: keys.access_token_secret,
  timeout_ms: 5 * 1000,
});

const tweets = [];
const numTweets = 3200;


function getTweets(maxId, iteration, callback) {
  console.log(`Fetching tweets page ${iteration}`);

  // Get 200 more tweets
  t.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200, max_id: maxId })
    .then((result) => {
      const data = result.data;
      // Add tweets to the list
      tweets.push(...data.map(tweet => tweet.text));
      // Max ID is one less than the ID of the least recent tweet returned by this call. (see
      // https://dev.twitter.com/rest/public/timelines)
      if (iteration * 200 < numTweets) {
        // Recursive call to get next page
        getTweets(
          bigInt(data[data.length - 1].id_str).subtract(1).toString(),
          iteration + 1,
          callback,
        );
      } else callback(); // If we're done adding things to tweets, run the callback
    });
}

getTweets(undefined, 1, () => {
  const data = tweets.map(tweet => unescape(tweet).split(' ').filter(n => !n.includes('t.co/')));
  const m = new Markov(data);
  runner(m, 100);
});
