const Markov = require('..');
const runner = require('./runner');

const sentences = [
  'The boy plays',
  'Jack eats',
  'Jack quickly eats',
  'Jack quickly eats carrots',
  'Jack quickly eats fresh carrots at home',
  'Sara sits',
  'The girl pets the cat',
  'I love apples',
  'Bill kicks the ball',
  'Bill kicks the red ball hard every day',
  'Lisa is pretty',
  'They are nice',
  'I am sad',
  'Maria laughs loudly',
  'The dog jumps high',
  'Apples are everywhere',
  'I am the teacher',
  'Jon is a carpenter',
  'The boy is a student',
  'Lisa looks pretty tonight',
  'Green apples are everywhere',
  'Jon is a smart student at school',
];

const m = new Markov(sentences.map(s => s.toLowerCase().split(' ')));
runner(m);
