const fs = require('fs');
const Intcode = require('./intcode');

const part1Puzzle = () => {
    const input = fs.readFileSync('./inputs/09.txt', 'utf-8');
    const intcode = new Intcode(input);
    return intcode.run([1]);
};

const part2Puzzle = () => {
    const input = fs.readFileSync('./inputs/09.txt', 'utf-8');
    const intcode = new Intcode(input);
    return intcode.run([2]);
};

module.exports = {
    day: 9,
    part1Puzzle: part1Puzzle,
    part2Puzzle: part2Puzzle,
};
