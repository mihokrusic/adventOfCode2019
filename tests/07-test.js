const assert = require('assert');

const day = require('../solutions/07.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check test input', () => assert.equal(43210, day.getCombinationResult('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0', [4, 3, 2, 1, 0])));
        it('check test input', () =>
            assert.equal(54321, day.getCombinationResult('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0', [0, 1, 2, 3, 4])));
        it('check test input', () =>
            assert.equal(
                65210,
                day.getCombinationResult('3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0', [
                    1,
                    0,
                    4,
                    3,
                    2,
                ]),
            ));
        it('check puzzle input', () => assert.equal(30940, day.testRealInput()));
    });

    describe('Part 2', () => {});
});
