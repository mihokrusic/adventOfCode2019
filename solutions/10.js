const fs = require('fs');
const intcode = require('./intcode');

const getAsteroidsList = textFile => {
    const inputLines = fs.readFileSync(`./inputs/${textFile}`, 'utf-8').split(/\r?\n/);
    const asteroids = [];
    for (let i = 0; i < inputLines.length; i++) {
        for (let j = 0; j < inputLines[i].length; j++) {
            if (inputLines[i][j] === '.') {
                continue;
            }

            asteroids.push({
                x: j,
                y: i,
            });
        }
    }
    return asteroids;
};

const getAsteroidLines = (currentAsteroid, asteroids) => {
    let lines = [];

    for (let targetAsteroid of asteroids) {
        if (targetAsteroid === currentAsteroid) {
            continue;
        }

        const xDiff = currentAsteroid.x - targetAsteroid.x;
        const yDiff = currentAsteroid.y - targetAsteroid.y;

        let asteroid = {
            quadrant: 0,
            slope: '',
            distance: 0,
            x: targetAsteroid.x,
            y: targetAsteroid.y,
        };
        if (xDiff === 0) {
            asteroid.quadrant = yDiff > 0 ? 1 : 3;
            asteroid.slope = '0';
        } else if (yDiff === 0) {
            asteroid.quadrant = xDiff > 0 ? 4 : 2;
            asteroid.slope = '0';
        } else {
            if (xDiff < 0 && yDiff > 0) {
                asteroid.quadrant = 1;
                asteroid.slope = `${Math.abs(yDiff / xDiff).toFixed(5)}`;
            }
            if (xDiff < 0 && yDiff < 0) {
                asteroid.quadrant = 2;
                asteroid.slope = `${(yDiff / xDiff).toFixed(5)}`;
            }
            if (xDiff > 0 && yDiff < 0) {
                asteroid.quadrant = 3;
                asteroid.slope = `${Math.abs(yDiff / xDiff).toFixed(5)}`;
            }
            if (xDiff > 0 && yDiff > 0) {
                asteroid.quadrant = 4;
                asteroid.slope = `${(yDiff / xDiff).toFixed(5)}`;
            }
        }

        asteroid.distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        const match = lines.find(l => l.quadrant === asteroid.quadrant && l.slope === asteroid.slope);
        if (match) {
            if (match.distance > asteroid.distance) {
                match.distance = asteroid.distance;
                match.x = asteroid.x;
                match.y = asteroid.y;
            }
        } else {
            lines.push(asteroid);
        }
    }

    return lines;
};

const part1 = textFile => {
    const asteroids = getAsteroidsList(textFile);

    let bestLocation = null;
    let bestLocationAsteroidCount = null;
    for (let asteroid of asteroids) {
        let lines = getAsteroidLines(asteroid, asteroids);
        if (bestLocationAsteroidCount === null || lines.length > bestLocationAsteroidCount) {
            bestLocation = asteroid;
            bestLocationAsteroidCount = lines.length;
        }
    }
    return [bestLocation.x, bestLocation.y, bestLocationAsteroidCount];
};

const part2 = (textFile, x, y) => {
    const asteroids = getAsteroidsList(textFile);
    const location = asteroids.find(a => a.x === x && a.y === y);

    const TARGET_ASTEROID = 200;

    let zappedAsteroids = 0;
    while (zappedAsteroids < TARGET_ASTEROID) {
        let lines = getAsteroidLines(location, asteroids);
        lines.sort((a, b) => {
            if (a.quadrant < b.quadrant) {
                return -1;
            }

            if (a.quadrant > b.quadrant) {
                return 1;
            }

            return +a.slope < +b.slope ? -1 : 1;
        });

        if (zappedAsteroids + lines.length > TARGET_ASTEROID) {
            const target = lines[TARGET_ASTEROID - zappedAsteroids - 1];
            return target.x * 100 + target.y;
        }

        zappedAsteroids += lines.length;

        lines.forEach(line => {
            const index = asteroids.findIndex(a => a.x === line.x && a.y === line.y);
            asteroids.splice(index, 1);
        });
    }

    return null;
};

module.exports = {
    day: 10,
    part1: part1,
    part2: part2,
};
