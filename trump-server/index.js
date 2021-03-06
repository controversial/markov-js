/*
 * TODO: caching
 * - Store what the max_ids for each page are in a tempfile
 * - After a request is served for a given page, update in the background:
 *   - check if the most recent tweet has changed
 *   - If it has, update the max tweet IDs for all pages.
 */

const express = require('express');
const fs = require('fs');
const Twit = require('twit');
const unescape = require('unescape');
const bigInt = require('big-integer');

// If keys.json is present, load its contents into environment variables
const keypath = `${__dirname}/keys.json`;
if (fs.existsSync(keypath)) {
  const keys = JSON.parse(fs.readFileSync(keypath).toString());
  process.env.consumer_key = keys.consumer_key;
  process.env.consumer_secret = keys.consumer_secret;
  process.env.access_token = keys.access_token;
  process.env.access_token_secret = keys.access_token_secret;
}

// Initialize twit object with keys
const t = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 5 * 1000,
});


const app = express();

app.set('json spaces', 2);

app.get('/:page?', (req, res) => {
  const page = req.params.page;
  t.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200 })
    .then((result) => {
      const tweets = result.data
        .map(tweet => tweet.text)
        .map(tweet => unescape(tweet))
        .map(tweet => tweet.replace(/\s+/g, ' '));
      res.send(tweets);
    });
});

console.log('Now listening at http://0.0.0.0:3000');
app.listen(3000, '0.0.0.0');
