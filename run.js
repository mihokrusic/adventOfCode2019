const dayNumber = '05';
const day = require('./solutions/' + dayNumber + '.js');

const intcode = require('./solutions/intcode');
const result = intcode('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99');
console.log(result.output);
