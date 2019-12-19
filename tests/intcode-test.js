const assert = require('assert');

const intcode = require('../solutions/intcode.js');

describe(`General intcode program tests`, () => {
    describe('Part 1', () => {
        it('check large number output', () => {
            const output = intcode('104, 1125899906842624, 99').output;
            return assert.equal(1125899906842624, output[output.length - 1]);
        });
        it('check large number output 2', () => {
            const output = intcode('1102,34915192,34915192,7,4,7,99,0').output;
            return assert.equal(1219070632396864, output[output.length - 1]);
        });
        it('check own copy', () => {
            const program = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
            return assert.equal(program, intcode(program).output);
        });
    });
});
