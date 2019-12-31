const fs = require('fs');
const path = require('path');
const Intcode = require('./../../src/intcode');
const permutator = require('./../../src/helpers').permutator;

const getResultWithoutFeedback = (program, run) => {
    let lastOutput = 0;

    for (let i = 0; i < 5; i++) {
        const intcode = new Intcode(program);

        lastOutput = intcode.run([run[i], lastOutput]);
    }

    return lastOutput;
};

const getResultWithFeedback = (program, run) => {
    const amplifiers = [new Intcode(program), new Intcode(program), new Intcode(program), new Intcode(program), new Intcode(program)];

    let lastOutputs = [0, 0, 0, 0, 0];
    let amplifierOutput = 0;
    let first = true;
    while (!amplifiers[4].finished) {
        for (let i = 0; i < amplifiers.length; i++) {
            const previousOutput = i === 0 ? lastOutputs[4] : lastOutputs[i - 1];
            let params = [];
            if (first) {
                params.push(run[i]);
            }
            params.push(previousOutput);

            amplifierOutput = amplifiers[i].run(params);
            if (!amplifiers[i].finished) {
                lastOutputs[i] = amplifierOutput;
            }
        }

        first = false;
    }

    return lastOutputs[4];
};

const part1 = () => {
    const program = fs.readFileSync(path.join(__dirname, '07.txt'), 'utf-8');

    const runs = permutator([0, 1, 2, 3, 4]);
    let bestRun = 0;
    runs.forEach(run => {
        const runResult = getResultWithoutFeedback(program, run);

        if (runResult > bestRun) {
            bestRun = runResult;
        }
    });

    return bestRun;
};

const part2 = () => {
    const program = fs.readFileSync(path.join(__dirname, '07.txt'), 'utf-8');

    const runs = permutator([5, 6, 7, 8, 9]);
    let bestRun = 0;
    runs.forEach(run => {
        const runResult = getResultWithFeedback(program, run);

        if (runResult > bestRun) {
            bestRun = runResult;
        }
    });

    return bestRun;
};

module.exports = {
    day: 7,
    getResultWithoutFeedback: getResultWithoutFeedback,
    getResultWithFeedback: getResultWithFeedback,
    part1: part1,
    part2: part2,
};
