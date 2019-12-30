const assert = require('assert');

const day = require('./09.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check puzzle input', () => {
            return assert.equal(2594708277, day.part1Puzzle());
        });
    });

    describe('Part 2', () => {
        it('check puzzle input', () => {
            return assert.equal(87721, day.part2Puzzle());
        });
    });
});
