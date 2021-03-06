const assert = require('assert');

const day = require('./04.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check puzzle input', () => assert.equal(579, day.getValidPasswordCount(353096, 843212)));
    });

    describe('Part 2', () => {
        it('check puzzle input', () => assert.equal(358, day.getValidPasswordCountPart2(353096, 843212)));
    });
});
