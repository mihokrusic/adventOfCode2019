const assert = require('assert');

const day = require('./01.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check input 12', () => assert.equal(2, day.getFuel('12')));
        it('check input 14', () => assert.equal(2, day.getFuel('14')));
        it('check input 1969', () => assert.equal(654, day.getFuel('1969')));
        it('check input 100756', () => assert.equal(33583, day.getFuel('100756')));
        it('check puzzle input', () => assert.equal(3256599, day.partOne()));
    });

    describe('Part 2', () => {
        it('check input 14', () => assert.equal(2, day.getRecursiveFuel('14')));
        it('check input 1969', () => assert.equal(966, day.getRecursiveFuel('1969')));
        it('check input 100756', () => assert.equal(50346, day.getRecursiveFuel('100756')));
        it('check puzzle input', () => assert.equal(4882038, day.partTwo()));
    });
});
