const fs = require('fs');

const findIntersection = (path, firstPath, wireToCheck) => {
    for (let i = 0; i < wireToCheck.length; i++) {
        const pathToCheck = wireToCheck[i];

        if (firstPath && i === 0) {
            continue;
        }
        if (path.vert === pathToCheck.vert) {
            continue;
        }

        const minX = Math.min(path.fromX, path.toX);
        const maxX = Math.max(path.fromX, path.toX);
        const minY = Math.min(path.fromY, path.toY);
        const maxY = Math.max(path.fromY, path.toY);

        const minPathToCheckX = Math.min(pathToCheck.fromX, pathToCheck.toX);
        const maxPathToCheckX = Math.max(pathToCheck.fromX, pathToCheck.toX);
        const minPathToCheckY = Math.min(pathToCheck.fromY, pathToCheck.toY);
        const maxPathToCheckY = Math.max(pathToCheck.fromY, pathToCheck.toY);

        if (pathToCheck.horz) {
            if (minPathToCheckX <= path.fromX && maxPathToCheckX >= path.toX && minPathToCheckY <= maxY && maxPathToCheckY >= minY) {
                return {
                    x: path.fromX,
                    y: minPathToCheckY,
                };
            }
        }
        if (pathToCheck.vert) {
            if (minPathToCheckY <= path.fromY && maxPathToCheckY >= path.toY && minPathToCheckX <= maxX && maxPathToCheckX >= minX) {
                return {
                    x: minPathToCheckX,
                    y: path.fromY,
                };
            }
        }
    }

    return null;
};

const getDistForClosestInt = wires => {
    const wirePaths = [];
    wires.forEach(wire => {
        let current = { x: 0, y: 0 };
        const wireDirections = wire.split(',');

        const wirePath = [];
        wireDirections.forEach(direction => {
            const moves = +direction.substr(1);
            switch (direction[0]) {
                case 'R':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x + moves, toY: current.y, vert: false, horz: true });
                    current.x += moves;
                    break;
                case 'U':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x, toY: current.y + moves, vert: true, horz: false });
                    current.y += moves;
                    break;
                case 'L':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x - moves, toY: current.y, vert: false, horz: true });
                    current.x -= moves;
                    break;
                case 'D':
                    wirePath.push({ fromX: current.x, fromY: current.y, toX: current.x, toY: current.y - moves, vert: true, horz: false });
                    current.y -= moves;
                    break;
            }
        });
        wirePaths.push(wirePath);
    });

    const firstWire = wirePaths[0];
    const secondWire = wirePaths[1];

    let closestIntersectionDistance = Number.MAX_VALUE;
    firstWire.forEach((fpath, i) => {
        const intersection = findIntersection(fpath, i === 0, secondWire);
        if (intersection) {
            const currentDistance = Math.abs(intersection.x) + Math.abs(intersection.y);
            if (closestIntersectionDistance > currentDistance) {
                closestIntersectionDistance = currentDistance;
            }
        }
    });

    return closestIntersectionDistance;
};

const partOneRealInput = () => {
    const input = fs.readFileSync('./inputs/03.txt', 'utf-8').split(/\r?\n/);
    return getDistForClosestInt(input);
};

module.exports = {
    day: 3,
    getDistForClosestInt: getDistForClosestInt,
    partOneRealInput: partOneRealInput,
};
