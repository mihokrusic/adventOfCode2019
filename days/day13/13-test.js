const assert = require('assert');

const day = require('./13.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('test puzzle input', () => assert.equal(213, day.part1()));
    });

    describe('Part 2', () => {
        it('test puzzle input', () => assert.equal(11441, day.part2()));
    });
});
