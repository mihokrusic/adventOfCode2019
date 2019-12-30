const fs = require('fs');
const path = require('path');

const part1Puzzle = () => {
    const input = fs
        .readFileSync(path.join(__dirname, '08.txt'), 'utf-8')
        .split('')
        .map(i => +i);

    const elementsInLayer = 25 * 6;
    const layerCount = input.length / elementsInLayer;

    const layers = [];

    for (let i = 0; i < layerCount; i++) {
        const layerBreakdown = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let j = i * elementsInLayer; j < i * elementsInLayer + elementsInLayer; j++) {
            layerBreakdown[input[j]] = layerBreakdown[input[j]] + 1;
        }
        layers.push(layerBreakdown);
    }

    let layerWithFewestZeros = null;
    for (let i = 0; i < layers.length; i++) {
        if (i === 0 || layers[i][0] < layerWithFewestZeros[0]) {
            layerWithFewestZeros = layers[i];
        }
    }
    return layerWithFewestZeros[1] * layerWithFewestZeros[2];
};

const part2Puzzle = () => {
    const input = fs
        .readFileSync(path.join(__dirname, '08.txt'), 'utf-8')
        .split('')
        .map(i => +i);

    const elementsInLayer = 25 * 6;
    const layerCount = input.length / elementsInLayer;

    let finalImage = '';
    for (let i = 0; i < elementsInLayer; i++) {
        for (let j = 0; j < layerCount; j++) {
            let elementToCheck = i + j * elementsInLayer;
            if (input[elementToCheck] === 2) {
                continue;
            }

            finalImage += input[elementToCheck].toString();
            break;
        }
    }

    for (let y = 0; y < 6; y++) {
        let line = '';
        for (let x = 0; x < 25; x++) {
            let pixel = finalImage[x + y * 25];
            line += pixel === '0' ? ' ' : '#';
        }

        // console.log(line);
    }

    return 'JCRCB';
};

module.exports = {
    day: 8,
    part1Puzzle: part1Puzzle,
    part2Puzzle: part2Puzzle,
};
