const fs = require('fs');
const path = require('path');

const getEnergy = moons => {
    let energy = 0;
    for (let i = 0; i < moons.length; i++) {
        let potential = Math.abs(moons[i][0]) + Math.abs(moons[i][1]) + Math.abs(moons[i][2]);
        let kinetic = Math.abs(moons[i][3]) + Math.abs(moons[i][4]) + Math.abs(moons[i][5]);
        energy += potential * kinetic;
    }

    return energy;
};

const part1 = (input, steps) => {
    const inputLines = fs.readFileSync(path.join(__dirname, input), 'utf-8').split(/\r?\n/);

    const moons = [];
    inputLines.map(line => {
        let moon = line
            .replace(/<|>|x=|y=|z=|,/g, '')
            .split(' ')
            .map(i => +i);
        moon.push(...[0, 0, 0]);
        moons.push(moon);
    });

    for (let i = 0; i < steps; i++) {
        for (let j = 0; j < moons.length - 1; j++) {
            for (let k = j + 1; k < moons.length; k++) {
                if (j === k) {
                    continue;
                }

                if (moons[j][0] > moons[k][0]) {
                    moons[j][3] += -1;
                    moons[k][3] += 1;
                }
                if (moons[j][0] < moons[k][0]) {
                    moons[j][3] += 1;
                    moons[k][3] += -1;
                }
                if (moons[j][1] > moons[k][1]) {
                    moons[j][4] += -1;
                    moons[k][4] += 1;
                }
                if (moons[j][1] < moons[k][1]) {
                    moons[j][4] += 1;
                    moons[k][4] += -1;
                }
                if (moons[j][2] > moons[k][2]) {
                    moons[j][5] += -1;
                    moons[k][5] += 1;
                }
                if (moons[j][2] < moons[k][2]) {
                    moons[j][5] += 1;
                    moons[k][5] += -1;
                }
            }
        }

        for (let j = 0; j < moons.length; j++) {
            moons[j][0] += moons[j][3];
            moons[j][1] += moons[j][4];
            moons[j][2] += moons[j][5];
        }
    }

    return getEnergy(moons);
};

module.exports = {
    day: 12,
    part1: part1,
};
