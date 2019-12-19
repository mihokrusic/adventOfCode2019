const fs = require('fs');
const intcode = require('./intcode');

const testRealInput = input => {
    const programInput = fs.readFileSync('./inputs/05.txt', 'utf-8');
    const output = intcode(programInput, [input]).output;
    return output[output.length - 1];
};

module.exports = {
    day: 5,
    testRealInput: testRealInput,
};
