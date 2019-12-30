const fs = require('fs');
const path = require('path');
const Intcode = require('./../../src/intcode');

const getKey = current => `${current[0]}|${current[1]}`;

const paint = (input, field) => {
    const intcode = new Intcode(input);

    const current = [0, 0];
    let direction = 0; // top, right, bottom, left, (0123)

    while (!intcode.finished) {
        let color = 0;
        let alreadyVisited = field[getKey(current)] !== undefined;
        if (alreadyVisited) {
            color = field[getKey(current)].color;
        }

        let colorCommand = intcode.run([color]);
        let directionCommand = intcode.run([color]);

        if (alreadyVisited) {
            field[getKey(current)].color = colorCommand;
            field[getKey(current)].visits++;
        } else {
            field[getKey(current)] = {
                color: colorCommand,
                visits: 1,
            };
        }

        direction += directionCommand === 0 ? -1 : 1;
        if (direction === -1) direction = 3;
        if (direction === 4) direction = 0;

        switch (direction) {
            case 0:
                current[1]++;
                break;
            case 1:
                current[0]++;
                break;
            case 2:
                current[1]--;
                break;
            case 3:
                current[0]--;
                break;
        }
    }

    return field;
};

const part1 = () => {
    const input = fs.readFileSync(path.join(__dirname, '11.txt'), 'utf-8');

    let field = {};
    field = paint(input, field);
    return Object.keys(field).length;
};

const part2 = () => {
    const input = fs.readFileSync(path.join(__dirname, '11.txt'), 'utf-8');

    let field = {};
    field[getKey([0, 0])] = {
        color: 1,
        visits: 0,
    };
    field = paint(input, field);

    // We know from output that dims are max 50
    let output = [];
    for (let i = 0; i < 20; i++) {
        let outputLine = [];
        for (let j = 0; j < 50; j++) {
            outputLine.push(' ');
        }
        output.push(outputLine);
    }

    for (let key of Object.keys(field)) {
        if (field[key].color === 1) {
            const dims = key.split('|').map(i => +i);
            output[20 - (dims[1] + 10)][dims[0]] = '#';
        }
    }

    // for (let line of output) {
    //     console.log(line.join(''));
    // }

    return Object.keys(field).length;
};

module.exports = {
    day: 11,
    part1: part1,
    part2: part2,
};
