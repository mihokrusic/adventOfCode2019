const fs = require('fs');
const intcode = require('./intcode');

const part1 = () => {
    const input = fs.readFileSync('./inputs/11.txt', 'utf-8');
    const result = intcode(input, [0]);
    console.log(result.output);
    return 0;
};

module.exports = {
    day: 11,
    part1: part1,
};
