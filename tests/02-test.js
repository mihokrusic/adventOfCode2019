const assert = require('assert');

const day = require('../solutions/02.js');

describe(`Day ${day.day}`, () => {
    describe('Part 1', () => {
        it('check input 1,0,0,0,99', () => assert.equal(2, day.partOne('1,0,0,0,99')));
        it('check input 1,1,1,4,99,5,6,0,99', () => assert.equal(30, day.partOne('1,1,1,4,99,5,6,0,99')));
        it('check input 1,9,10,3,2,3,11,0,99,30,40,50', () => assert.equal(3500, day.partOne('1,9,10,3,2,3,11,0,99,30,40,50')));
        it('check puzzle input', () => assert.equal(4330636, day.partOneRealInput()));
    });

    describe('Part 2', () => {
        it('check puzzle input', () => assert.equal(6086, day.partTwoRealInput()));
    });
});
