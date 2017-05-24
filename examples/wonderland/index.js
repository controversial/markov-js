const Markov = require('../..');
const runner = require('../runner');

const fs = require('fs');

const sentences = fs.readFileSync(`${__dirname}/wonderland.txt`)
  .toString()
  .split('THE END')[0]     // Exclude gutenberg license
  .replace(/\s+/g, ' ')    // Normalize all whitespace to a single space
  .split('.')              // Split into sentences by periods 
  .map(s => s.split(' ')); // Split each element by spaces

const m = new Markov(sentences);
runner(m);
