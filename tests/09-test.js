const assert = require('assert');

const day = require('../solutions/09.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check puzzle input', () => {
            const result = day.part1Puzzle();
            return assert.equal(2594708277, result[0]);
        });
    });

    describe('Part 2', () => {
        it('check puzzle input', () => {
            const result = day.part2Puzzle();
            return assert.equal(87721, result[0]);
        });
    });
});
