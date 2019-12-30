const fs = require('fs');
const path = require('path');
const Intcode = require('./../../src/intcode');

const testRealInput = input => {
    const programInput = fs.readFileSync(path.join(__dirname, '05.txt'), 'utf-8');

    const intcode = new Intcode(programInput);
    let lastOutput = null,
        currentOutput = null;

    while (!intcode.finished) {
        currentOutput = intcode.run(input);

        if (!intcode.finished) {
            lastOutput = currentOutput;
        }
    }

    return lastOutput;
};

module.exports = {
    day: 5,
    testRealInput: testRealInput,
};
