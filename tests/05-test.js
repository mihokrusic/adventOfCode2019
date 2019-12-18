const assert = require('assert');

const day = require('../solutions/05.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check puzzle input', () => assert.equal(16434972, day.testRealInput(1)));
    });

    describe('Part 2', () => {
        it('check puzzle input', () => assert.equal(16694270, day.testRealInput(5)));
    });
});
