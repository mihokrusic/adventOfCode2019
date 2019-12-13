const fs = require('fs');

function getFuel(mass) {
    return Math.trunc(mass / 3) - 2;
}

function getRecursiveFuel(mass) {
    let finalMass = 0;
    let currentMass = mass;
    let fuel = getFuel(currentMass);
    while (fuel > 0) {
        finalMass += fuel;
        currentMass = fuel;
        fuel = getFuel(currentMass);
    }
    return finalMass;
}

const partOne = () => {
    let fuel = 0;
    const inputMass = fs.readFileSync('./inputs/01.txt', 'utf-8').split(/\r?\n/);
    inputMass.forEach(mass => (fuel += getFuel(+mass)));

    return fuel;
};

const partTwo = () => {
    let fuel = 0;
    const inputMass = fs.readFileSync('./inputs/01.txt', 'utf-8').split(/\r?\n/);
    inputMass.forEach(mass => (fuel += getRecursiveFuel(+mass)));

    return fuel;
};

module.exports = {
    day: 1,
    getFuel: getFuel,
    getRecursiveFuel: getRecursiveFuel,
    partOne: partOne,
    partTwo: partTwo,
};
