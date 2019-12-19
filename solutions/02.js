const fs = require('fs');
const intcode = require('./intcode');

const partOneRealInput = () => {
    const input = fs.readFileSync('./inputs/02.txt', 'utf-8').split(',');
    input[1] = 12;
    input[2] = 2;

    const { program } = intcode(input.join(','));
    return program[0];
};

const partTwoRealInput = () => {
    const input = fs.readFileSync('./inputs/02.txt', 'utf-8').split(',');

    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            input[1] = i;
            input[2] = j;

            const { program } = intcode(input.join(','));
            result = program[0];

            if (result === 19690720) {
                return 100 * i + j;
            }
        }
    }

    return 0;
};

module.exports = {
    day: 2,
    intcode: intcode,
    partOneRealInput: partOneRealInput,
    partTwoRealInput: partTwoRealInput,
};
