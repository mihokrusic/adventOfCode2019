const fs = require('fs');
const path = require('path');

const getOrbitCount = (orbit, level) => {
    let result = level;
    for (let i = 0; i < orbit.children.length; i++) {
        result += getOrbitCount(orbit.children[i], level + 1);
    }
    return result;
};

const getOrbits = (graph, planet) => {
    let current = graph[planet];
    const result = [current.source];
    while (true) {
        current = graph[current.target];
        if (!current) {
            break;
        }

        result.push(current.source);
    }

    return result;
};

const getOrbitTransfers = (graph, from, to) => {
    const fromGraph = getOrbits(graph, from);
    const toGraph = getOrbits(graph, to);
    for (let i = 0; i < fromGraph.length; i++) {
        const toGraphPos = toGraph.indexOf(fromGraph[i]);
        if (toGraphPos !== -1) {
            return i + toGraphPos - 2;
        }
    }

    return 0;
};

const getOrbitGraph = input => {
    const graph = {};

    let i = 0;
    while (input.length) {
        let [target, source] = input[i].split(')');
        graph[source] = {
            target,
            source,
            children: [],
        };
        input.splice(i, 1);

        if (i >= input.length) {
            i = 0;
        }
    }

    let start = null;
    for (let key of Object.keys(graph)) {
        const current = graph[key];
        if (current.target === 'COM') {
            start = current;
            continue;
        }

        graph[current.target].children.push(current);
    }

    return { graph, start };
};

const part1Test = () => {
    const input = fs.readFileSync(path.join(__dirname, '06_1.txt'), 'utf-8').split(/\r?\n/);
    const { graph, start } = getOrbitGraph(input);
    return getOrbitCount(start, 1);
};

const part1Puzzle = () => {
    const input = fs.readFileSync(path.join(__dirname, '06_puzzle.txt'), 'utf-8').split(/\r?\n/);
    const { graph, start } = getOrbitGraph(input);
    return getOrbitCount(start, 1);
};

const part2Test = () => {
    const input = fs.readFileSync(path.join(__dirname, '06_2.txt'), 'utf-8').split(/\r?\n/);
    const { graph, start } = getOrbitGraph(input);
    return getOrbitTransfers(graph, 'YOU', 'SAN');
};

const part2Puzzle = () => {
    const input = fs.readFileSync(path.join(__dirname, '06_puzzle.txt'), 'utf-8').split(/\r?\n/);
    const { graph, start } = getOrbitGraph(input);
    return getOrbitTransfers(graph, 'YOU', 'SAN');
};

module.exports = {
    day: 6,
    part1Test: part1Test,
    part1Puzzle: part1Puzzle,
    part2Test: part2Test,
    part2Puzzle: part2Puzzle,
};
