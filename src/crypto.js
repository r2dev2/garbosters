import { QUOTES } from './stats.js';

// const choose = arr => arr[Math.floor(Math.random() * arr.length)];
const choose = arr => arr[0];

const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateRandomEncryption = () => {
    const encMap = shuffleArray([...Array(26).keys()]);
    if (encMap.some((x, i) => x == i)) return generateRandomEncryption();
    return encMap.map(i => alphabet[i]);
};

export const newAristocrat = difficulty => {
    const { text, author } = choose(QUOTES[difficulty]);
    const plaintext = text.toUpperCase();
    const encryptionAlphabet = generateRandomEncryption();
    const ciphertext = [...plaintext]
        .map(char => encryptionAlphabet[alphabet.indexOf(char)] ?? char)
        .join('');
    return { author, plaintext, ciphertext };
};

export const SPLIT = {
    WORD: 0,
    NONWORD: 1,
};

export const splitText = text => {
    const res = [];
    let lastIdx = 0;
    const pushAlpha = content => {
        if (content) {
            res.push({ type: SPLIT.WORD, content, index: lastIdx });
        }
    };
    for (const { 0: nonalpha, index } of text.matchAll(/\W+/g)) {
        const alpha = text.substring(lastIdx, index);
        pushAlpha(alpha);
        res.push({ type: SPLIT.NONWORD, content: nonalpha });
        lastIdx = index + nonalpha.length;
    }
    pushAlpha(text.substring(lastIdx));
    return res;
};
