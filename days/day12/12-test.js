const assert = require('assert');

const day = require('./12.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('test input 1', () => assert.equal(179, day.part1('12_1.txt', 10)));
        it('test input 2', () => assert.equal(1940, day.part1('12_2.txt', 100)));
        it('test puzzle input', () => assert.equal(14780, day.part1('12_puzzle.txt', 1000)));
    });

    describe('Part 2', () => {
        // it('test puzzle input', () => assert.equal(250, day.part2()));
    });
});
