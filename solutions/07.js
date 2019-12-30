const fs = require('fs');
const Intcode = require('./intcode');

const permutator = inputArr => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);

    return result;
};

const getCombinationResult = (program, run) => {
    let lastOutput = 0;

    for (let i = 0; i < 5; i++) {
        const intcode = new Intcode(program);

        lastOutput = intcode.run([run[i], lastOutput]);
    }

    return lastOutput;
};

const getHighestSignal = program => {
    const runs = permutator([0, 1, 2, 3, 4]);
    let bestRun = 0;
    runs.forEach(run => {
        const runResult = getCombinationResult(program, run);

        if (runResult > bestRun) {
            bestRun = runResult;
        }
    });

    return bestRun;
};

const testRealInput = () => {
    const puzzleInput = fs.readFileSync('./inputs/07.txt', 'utf-8');
    return getHighestSignal(puzzleInput);
};

module.exports = {
    day: 7,
    getCombinationResult: getCombinationResult,
    getHighestSignal: getHighestSignal,
    testRealInput: testRealInput,
};
