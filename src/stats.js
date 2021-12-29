import ALL_QUOTES from './quotes.js';

const frequencyTable = {
  e: 0.1251,
  t: 0.0925,
  a: 0.0804,
  o: 0.0760,
  i: 0.0726,
  n: 0.0709,
  s: 0.0654,
  r: 0.0612,
  h: 0.0549,
  l: 0.0414,
  d: 0.0399,
  c: 0.036,
  u: 0.0271,
  m: 0.0253,
  f: 0.0230,
  p: 0.0200,
  g: 0.0196,
  w: 0.0192,
  y: 0.0173,
  b: 0.0154,
  v: 0.0099,
  k: 0.0067,
  x: 0.0019,
  j: 0.0016,
  q: 0.0011,
  z: 0.0009
};

const add = (x, y) => x + y;
const allChis = ALL_QUOTES.map(({text}) => chiSquare(text));
const meanChi = allChis.reduce(add) / allChis.length;
const varChi = allChis.map(x => (x - meanChi) ** 2).reduce(add) / allChis.length;
const stdChi = varChi ** 0.5;
export const Difficulty = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
};
export const QUOTES = {
  [Difficulty.EASY]: ALL_QUOTES.filter(({text}) => classifyText(text) == 0),
  [Difficulty.MEDIUM]: ALL_QUOTES.filter(({text}) => classifyText(text) == 1),
  [Difficulty.HARD]: ALL_QUOTES.filter(({text}) => classifyText(text) == 2),
};

function isAlpha(char) {
  const charcode = char.charCodeAt(0);
  return 97 <= charcode && charcode <= 122;
}

function countLetterStats(text) {
  const stats = {};
  let count = 0;
  for (const letter of text) {
    const ll = letter.toLowerCase();
    if (isAlpha(ll)) {
    	stats[ll] = (stats[ll] ?? 0) + 1;
      count++;
    }
  }
  return { stats, count };
}

function expectedFreq(count, ch) {
  return Math.max(frequencyTable[ch] * count, 1);
}

function chiSquare(text) {
  const { stats, count } = countLetterStats(text);
  const expected = ch => expectedFreq(count, ch);
  return Object.entries(stats)
    .map(stat => {
      const [ch, freq] = stat;
      return (freq - expected(ch)) ** 2 / expected(ch);
    })
    .reduce(add);
}

function classifyText(text) {
  const chiScore = chiSquare(text);
  if (chiScore < meanChi - stdChi * 0.80)
    return Difficulty.EASY;
  if (chiScore > meanChi + stdChi * 0.70)
    return Difficulty.HARD;
  return Difficulty.MEDIUM;
}

function setDefaultDifficulty(difficulty) {
  localStorage.setItem("difficulty", JSON.stringify(difficulty));
}

function getDefaultDifficulty() {
  return JSON.parse(localStorage.getItem("difficulty") ?? "1");
}
