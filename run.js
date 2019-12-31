const dayNumber = '12';
const day = require(`./days/day${dayNumber}/${dayNumber}.js`);

const result = day.part1('12_1.txt', 10);
console.log(result);
