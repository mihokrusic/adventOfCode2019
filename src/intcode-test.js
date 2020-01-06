const assert = require('assert');
const Intcode = require('./intcode.js');

describe(`General intcode program tests`, () => {
    describe('Part 1', () => {
        it('check large number output', () => {
            const intcode = new Intcode('104, 1125899906842624, 99');
            const output = intcode.run();
            return assert.equal(1125899906842624, output);
        });
        it('check large number output 2', () => {
            const intcode = new Intcode('1102,34915192,34915192,7,4,7,99,0');
            const output = intcode.run();
            return assert.equal(1219070632396864, output);
        });
        it('check own copy', () => {
            const program = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
            const intcode = new Intcode(program);
            let result = [];
            while (!intcode.finished) {
                const output = intcode.run();
                if (!intcode.finished) {
                    result.push(output);
                }
            }
            return assert.equal(program, result.join(','));
        });
    });
});
