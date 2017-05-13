const chalk = require('chalk');
const Table = require('cli-table');

const chars = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  bottom: '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  left: '',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '',
  'right-mid': '',
  middle: ' ',
};


function multiRunner(markov, iterations) {
  const table = new Table({ chars, style: { 'padding-left': 0, 'padding-right': 0 } });

  for (let i = 1; i <= iterations; i += 1) {
    // Run
    const startTime = new Date();
    const output = markov.get().join(' ');
    const timeElapsed = ((new Date() - startTime) / 1000).toFixed(3);

    // Record
    table.push([
      chalk.yellow(i),
      output,
      chalk.blue(`${timeElapsed}s`),
    ]);
  }

  // Output
  console.log(table.toString());
}

function singleRunner(markov) {
  const startTime = new Date();
  const output = markov.get().join(' ');
  const timeElapsed = ((new Date() - startTime) / 1000).toFixed(3);

  console.log(chalk.blue(timeElapsed), output);
}

module.exports = function runner(markov, iterations = 10) {
  (iterations > 1 ? multiRunner : singleRunner)(markov, iterations);
};
