const fs = require('fs');
const Intcode = require('./intcode');

const executeAndGetFirstInstruction = instructions => {
    const intcode = new Intcode(instructions);
    intcode.run();
    return intcode.program[0];
};

const partOneRealInput = () => {
    const input = fs.readFileSync('./inputs/02.txt', 'utf-8').split(',');
    input[1] = 12;
    input[2] = 2;

    return executeAndGetFirstInstruction(input.join(','));
};

const partTwoRealInput = () => {
    const input = fs.readFileSync('./inputs/02.txt', 'utf-8').split(',');

    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            input[1] = i;
            input[2] = j;

            result = executeAndGetFirstInstruction(input.join(','));

            if (result === 19690720) {
                return 100 * i + j;
            }
        }
    }

    return 0;
};

module.exports = {
    day: 2,
    executeAndGetFirstInstruction: executeAndGetFirstInstruction,
    partOneRealInput: partOneRealInput,
    partTwoRealInput: partTwoRealInput,
};
