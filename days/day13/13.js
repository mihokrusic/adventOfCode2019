const fs = require('fs');
const path = require('path');
const Intcode = require('./../../src/intcode');

const getKey = instruction => `${instruction[0]}|${instruction[1]}`;

const drawBoard = (score, board) => {
    let rowCount = 0;
    board.forEach(value => (rowCount = Math.max(rowCount, value[1])));

    for (let i = 0; i < rowCount; i++) {
        process.stdout.write('\n');
    }
    process.stdout.moveCursor(0, -rowCount);

    const pos = [0, 0];
    board.forEach(value => {
        pos[0] = value[0];
        pos[1] = value[1];
        process.stdout.cursorTo(pos[0], pos[1]);

        switch (value[2]) {
            case 0:
                process.stdout.write(' ');
                break;
            case 1:
                process.stdout.write('#');
                break;
            case 2:
                process.stdout.write('B');
                break;
            case 3:
                process.stdout.write('_');
                break;
            case 4:
                process.stdout.write('O');
                break;
        }
    });
};

const part1 = () => {
    let input = fs.readFileSync(path.join(__dirname, '13.txt'), 'utf-8').split(',');

    const intcode = new Intcode(input.join(','));
    const board = new Map();

    const instruction = [];
    let pointer = 0;
    while (!intcode.finished) {
        let result = intcode.run([]);

        if (intcode.finished) {
            continue;
        }

        if (intcode.stopReason === 'output') {
            instruction[pointer] = result;
            pointer++;

            if (pointer === 3) {
                pointer = 0;
                const key = getKey(instruction);

                if (board.has(key)) {
                } else {
                    board.set(key, [...instruction]);
                }
            }
        }
    }

    let blocks = 0;
    board.forEach(value => {
        if (value[2] === 2) {
            blocks++;
        }
    });

    return blocks;
};

const part2 = () => {
    let input = fs.readFileSync(path.join(__dirname, '13.txt'), 'utf-8').split(',');
    input[0] = 2;
    const intcode = new Intcode(input.join(','));
    const board = new Map();

    const instruction = [];
    let score = 0;
    let pointer = 0;
    let inputs = [];

    let paddle = [];
    let ball = [];

    while (!intcode.finished) {
        let result = intcode.run(inputs);
        if (intcode.finished) {
            continue;
        }
        if (intcode.stopReason === 'output') {
            instruction[pointer] = result;
            pointer++;

            if (pointer === 3) {
                pointer = 0;

                if (instruction[0] === -1 && instruction[1] === 0) {
                    score = instruction[2];
                } else {
                    const key = getKey(instruction);
                    board.set(key, [...instruction]);

                    if (instruction[2] === 3) {
                        paddle = [...instruction];
                    }

                    if (instruction[2] === 4) {
                        ball = [...instruction];
                    }
                }
            }
        }

        //drawBoard(score, board);

        inputs = ball && paddle ? [Math.max(-1, Math.min(ball[0] - paddle[0], 1))] : [0];
    }

    return score;
};

module.exports = {
    day: 13,
    part1: part1,
    part2: part2,
};
