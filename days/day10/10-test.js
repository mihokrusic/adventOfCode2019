const assert = require('assert');

const day = require('./10.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('test input 1', () => assert.deepEqual([1, 1, 4], day.part1('10_1.txt')));
        it('test input 2', () => assert.deepEqual([3, 4, 8], day.part1('10_2.txt')));
        it('test input 3', () => assert.deepEqual([5, 8, 33], day.part1('10_3.txt')));
        it('test input 4', () => assert.deepEqual([1, 2, 35], day.part1('10_4.txt')));
        it('test input 5', () => assert.deepEqual([6, 3, 41], day.part1('10_5.txt')));
        it('test input 6', () => assert.deepEqual([11, 13, 210], day.part1('10_6.txt')));
        it('test puzzle input', () => assert.deepEqual([31, 20, 319], day.part1('10_puzzle.txt')));
    });

    describe('Part 2', () => {
        it('test input 6', () => assert.equal(802, day.part2('10_6.txt', 11, 13)));
        it('test puzzle input', () => assert.equal(517, day.part2('10_puzzle.txt', 31, 20)));
    });
});
