const assert = require('assert');

const day = require('../solutions/06.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check test input', () => assert.equal(42, day.part1Test()));
        it('check puzzle input', () => assert.equal(158090, day.part1Puzzle()));
    });

    describe('Part 2', () => {
        it('check test input', () => assert.equal(4, day.part2Test()));
        it('check puzzle input', () => assert.equal(241, day.part2Puzzle()));
    });
});
