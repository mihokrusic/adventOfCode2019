const fs = require('fs');
const path = require('path');

const findIntersection = (fpath, spath) => {
    if (fpath.vert === spath.vert) {
        return null;
    }

    const minX = Math.min(fpath.fromX, fpath.toX);
    const maxX = Math.max(fpath.fromX, fpath.toX);
    const minY = Math.min(fpath.fromY, fpath.toY);
    const maxY = Math.max(fpath.fromY, fpath.toY);

    const minPathToCheckX = Math.min(spath.fromX, spath.toX);
    const maxPathToCheckX = Math.max(spath.fromX, spath.toX);
    const minPathToCheckY = Math.min(spath.fromY, spath.toY);
    const maxPathToCheckY = Math.max(spath.fromY, spath.toY);

    if (spath.horz && minPathToCheckX <= fpath.fromX && maxPathToCheckX >= fpath.toX && minPathToCheckY <= maxY && maxPathToCheckY >= minY) {
        return {
            x: fpath.fromX,
            y: minPathToCheckY,
        };
    }
    if (spath.vert && minPathToCheckY <= fpath.fromY && maxPathToCheckY >= fpath.toY && minPathToCheckX <= maxX && maxPathToCheckX >= minX) {
        return {
            x: minPathToCheckX,
            y: fpath.fromY,
        };
    }

    return null;
};

const getWirePaths = input => {
    const wirePaths = [];
    input.forEach(wire => {
        let current = { x: 0, y: 0 };
        const wireDirections = wire.split(',');

        const wirePath = [];
        wireDirections.forEach(direction => {
            const moves = +direction.substr(1);
            switch (direction[0]) {
                case 'R':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x + moves, toY: current.y, vert: false, horz: true, delta: moves });
                    current.x += moves;
                    break;
                case 'U':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x, toY: current.y + moves, vert: true, horz: false, delta: moves });
                    current.y += moves;
                    break;
                case 'L':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x - moves, toY: current.y, vert: false, horz: true, delta: moves });
                    current.x -= moves;
                    break;
                case 'D':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x, toY: current.y - moves, vert: true, horz: false, delta: moves });
                    current.y -= moves;
                    break;
            }
        });
        wirePaths.push(wirePath);
    });
    return wirePaths;
};

const getDistForClosestInt = input => {
    const wirePaths = getWirePaths(input);

    let closestIntersectionDistance = Number.MAX_VALUE;
    wirePaths[0].forEach((fpath, i) => {
        wirePaths[1].forEach((spath, j) => {
            if (i === 0 && j === 0) {
                return;
            }
            const intersection = findIntersection(fpath, spath);
            if (intersection) {
                const currentDistance = Math.abs(intersection.x) + Math.abs(intersection.y);
                if (closestIntersectionDistance > currentDistance) {
                    closestIntersectionDistance = currentDistance;
                }
            }
        });
    });

    return closestIntersectionDistance;
};

const getDistForFewestSteps = input => {
    const wirePaths = getWirePaths(input);

    let intersectionFewestSteps = Number.MAX_VALUE;

    let firstWireSteps = 0;
    for (let i = 0; i < wirePaths[0].length; i++) {
        const fwire = wirePaths[0][i];
        let secondWireSteps = 0;
        for (let j = 0; j < wirePaths[1].length; j++) {
            const swire = wirePaths[1][j];
            if (i === 0 && j === 0) {
                secondWireSteps += swire.delta;
                continue;
            }
            const intersection = findIntersection(fwire, swire);
            if (intersection) {
                const intFirstWireSteps = firstWireSteps + Math.abs(fwire.horz ? fwire.fromX - intersection.x : fwire.fromY - intersection.y);
                const intSecondWireSteps = secondWireSteps + Math.abs(swire.horz ? swire.fromX - intersection.x : swire.fromY - intersection.y);
                if (intFirstWireSteps + intSecondWireSteps < intersectionFewestSteps) {
                    intersectionFewestSteps = intFirstWireSteps + intSecondWireSteps;
                }
                break;
            }

            secondWireSteps += swire.delta;
        }
        firstWireSteps += fwire.delta;
    }

    return intersectionFewestSteps;
};

const partOneRealInput = () => {
    const input = fs.readFileSync(path.join(__dirname, '03.txt'), 'utf-8').split(/\r?\n/);
    return getDistForClosestInt(input);
};

const partTwoRealInput = () => {
    const input = fs.readFileSync(path.join(__dirname, '03.txt'), 'utf-8').split(/\r?\n/);
    return getDistForFewestSteps(input);
};

module.exports = {
    day: 3,
    getDistForClosestInt: getDistForClosestInt,
    getDistForFewestSteps: getDistForFewestSteps,
    partOneRealInput: partOneRealInput,
    partTwoRealInput: partTwoRealInput,
};
