const assert = require('assert');

const day = require('../solutions/03.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check test input 1', () => assert.equal(6, day.getDistForClosestInt(['R8,U5,L5,D3', 'U7,R6,D4,L4'])));
        it('check test input 2', () => assert.equal(159, day.getDistForClosestInt(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'])));
        it('check test input 3', () =>
            assert.equal(135, day.getDistForClosestInt(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'])));
        it('check puzzle input', () => assert.equal(855, day.partOneRealInput()));
    });

    describe('Part 2', () => {
        it('check test input 1', () => assert.equal(30, day.getDistForFewestSteps(['R8,U5,L5,D3', 'U7,R6,D4,L4'])));
        it('check test input 2', () => assert.equal(610, day.getDistForFewestSteps(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'])));
        it('check test input 3', () =>
            assert.equal(410, day.getDistForFewestSteps(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'])));
        it('check puzzle input', () => assert.equal(11238, day.partTwoRealInput()));
    });
});
