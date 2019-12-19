const fs = require('fs');
const intcode = require('./intcode');

const part1Puzzle = () => {
    const input = fs.readFileSync('./inputs/09.txt', 'utf-8');
    const result = intcode(input, [1]);
    return result.output;
};

const part2Puzzle = () => {
    const input = fs.readFileSync('./inputs/09.txt', 'utf-8');
    const result = intcode(input, [2]);
    return result.output;
};

module.exports = {
    day: 9,
    part1Puzzle: part1Puzzle,
    part2Puzzle: part2Puzzle,
};
