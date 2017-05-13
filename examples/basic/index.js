const Markov = require('../..');
const runner = require('../runner');
const fs = require('fs');

const sentences = fs.readFileSync(`${__dirname}/sentences.txt`)
  .toString()
  .toLowerCase()
  .split('\n')             // Split by lines
  .filter(s => s)          // Remove empty elements
  .map(s => s.split(' ')); // Split each element by spaces

const m = new Markov(sentences);
runner(m);
