process.stdout.write('░░░░░░░░░░');
process.stdout.moveCursor(-10, 0);

let i = 0;
setInterval(() => {
    process.stdout.write('▓');
}, 1000);
