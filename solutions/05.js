const fs = require('fs');
const intcode = require('./intcode');

const testRealInput = input => {
    const programInput = fs.readFileSync('./inputs/05.txt', 'utf-8');
    return intcode(programInput, [input]).lastOutput;
};

module.exports = {
    day: 5,
    testRealInput: testRealInput,
};
