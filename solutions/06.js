const fs = require('fs');

const getOrbitCount = (orbit, level) => {
    let result = level;
    for (let i = 0; i < orbit.children.length; i++) {
        result += getOrbitCount(orbit.children[i], level + 1)
    }
    return result
};

const getOrbitGraph = (input) => {
    const orbits = {};

    let i = 0;
    while (input.length) {
        let [ target, source ] = input[i].split(')');
        orbits[source] = {
            target,
            source,
            connected: false,
            children: [],
        };
        input.splice(i, 1);

        if (i >= input.length) {
            i = 0;
        }
    }

    let start = null;
    for (let key of Object.keys(orbits)) {
        const current = orbits[key];
        if (current.target === 'COM') {
            start = current;
            continue;
        }

        orbits[current.target].children.push(current);
    }

    return getOrbitCount(start, 1);
}

const part1Test = () => {
    const input = fs.readFileSync('./inputs/06_1.txt', 'utf-8').split(/\r?\n/);
    return getOrbitGraph(input);
};

const part1Puzzle = () => {
    const input = fs.readFileSync('./inputs/06_2.txt', 'utf-8').split(/\r?\n/);
    return getOrbitGraph(input);
};

module.exports = {
    day: 5,
    part1Test: part1Test,
    part1Puzzle: part1Puzzle,
};
