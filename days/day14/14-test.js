const assert = require('assert');

const day = require('./14.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('test input 1', () => assert.equal(165, day.part1('14_1.txt')));
        it('test input 2', () => assert.equal(13312, day.part1('14_2.txt')));
        it('test input 3', () => assert.equal(180697, day.part1('14_3.txt')));
        it('test input 4', () => assert.equal(2210736 , day.part1('14_4.txt')));
        it('test puzzle input', () => assert.equal(0, day.part1('14_puzzle.txt')));
    });

    // describe('Part 2', () => {
    // });
});
