const Markov = require('../..');
const runner = require('../runner');
const request = require('superagent');
const JSDOM = require('jsdom').JSDOM;


request
  .get('http://www.creepypasta.com/wp-json/wp/v2/posts/')
  .query({ per_page: 100 })
  .end((err, res) => {
    console.log('100 stories downloaded')
    // Process response to extract story text
    const stories = res.body.map(post => {
      const dom = new JSDOM(post.content.rendered);
      return [...dom.window.document.getElementsByTagName('p')]
        .map(p => p.textContent)
        .join(' ');
    });
    console.log(stories[0]);
    const allSentences = [].concat(...stories.map(story => story.split('.')));
    // Put into markov chain
    const data = allSentences.map(sentence => sentence.split(' '));
    const m = new Markov(data);
    runner(m, 1);
  });
