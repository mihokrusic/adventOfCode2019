const dayNumber = '07';
const day = require(`./days/day${dayNumber}/${dayNumber}.js`);

const result = day.getResultWithFeedback('3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5', [9, 8, 7, 6, 5]);
console.log(result);
