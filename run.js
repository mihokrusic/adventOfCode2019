const dayNumber = '07';
const day = require('./solutions/' + dayNumber + '.js');
const intcode = require('./solutions/intcode');

const result = day.getCombinationResult('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0', [0, 1, 2, 3, 4]);
console.log(result);
