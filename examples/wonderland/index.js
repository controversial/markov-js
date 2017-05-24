const Markov = require('../..');
const runner = require('../runner');

const fs = require('fs');

const sentences = fs.readFileSync(`${__dirname}/chapter1.txt`)
  .toString()
  .toLowerCase()
  .replace(/\n/g, ' ')      // Remove line breaks
  .split('.')              // Split into sentences by periods
  .map(s => s.split(' ')); // Split each element by spaces

const m = new Markov(sentences);
runner(m);
