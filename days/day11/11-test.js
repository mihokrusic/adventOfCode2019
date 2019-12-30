const assert = require('assert');

const day = require('./11.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('test puzzle input', () => assert.equal(2141, day.part1()));
    });

    describe('Part 2', () => {
        it('test puzzle input', () => assert.equal(250, day.part2()));
    });
});
