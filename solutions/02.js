const fs = require('fs');

const partOne = input => {
    const program = input.split(',').map(i => +i);
    let currentIndex = 0;
    let running = true;
    while (running) {
        let currentCommand = program[currentIndex];
        let result = 0;

        switch (currentCommand) {
            case 1:
                result = program[program[currentIndex + 1]] + program[program[currentIndex + 2]];
                program[program[currentIndex + 3]] = result;
                break;
            case 2:
                result = program[program[currentIndex + 1]] * program[program[currentIndex + 2]];
                program[program[currentIndex + 3]] = result;
                break;
            case 99:
                running = false;
                break;
        }

        currentIndex += 4;
    }

    return program[0];
};

const partOneRealInput = () => {
    const input = fs.readFileSync('./inputs/02.txt', 'utf-8');
    const program = input.split(',');
    program[1] = 12;
    program[2] = 2;

    return partOne(program.join(','));
};

const partTwoRealInput = () => {
    const input = fs.readFileSync('./inputs/02.txt', 'utf-8');
    const program = input.split(',');

    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            program[1] = i;
            program[2] = j;
            const result = partOne(program.join(','));

            if (result === 19690720) {
                return 100 * i + j;
            }
        }
    }

    return 0;
};

module.exports = {
    day: 1,
    partOne: partOne,
    partOneRealInput: partOneRealInput,
    partTwoRealInput: partTwoRealInput,
};
