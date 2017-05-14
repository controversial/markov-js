const chalk = require('chalk');

module.exports = function runner(markov, iterations = 10) {
  for (let i = 1; i <= iterations; i += 1) {
    // Run
    const startTime = new Date();
    const output = markov.get().join(' ');
    const timeElapsed = ((new Date() - startTime) / 1000).toFixed(3);

    // Record
    console.log(
      '\n',
      chalk.yellow(`${i}.${' '.repeat(iterations.toString().length - i.toString().length)}`),
      chalk.blue(`${timeElapsed}s`),
      output,
    );
  }
};
