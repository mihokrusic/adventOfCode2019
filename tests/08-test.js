const assert = require('assert');

const day = require('../solutions/08.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check puzzle input', () => assert.equal(1474, day.part1Puzzle()));
    });

    describe('Part 2', () => {
        it('check puzzle input', () => assert.equal('JCRCB', day.part2Puzzle()));
    });
});
