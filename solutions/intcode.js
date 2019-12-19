const getParamValue = (program, index, mode, relativeBase) => {
    let value = 0;
    let currentIndexValue = program[index];
    switch (mode) {
        case '0':
            //if (typeof program[currentIndexValue] === 'undefined')
            value = program[currentIndexValue] || 0;
            break;
        case '1':
            value = currentIndexValue;
            break;
        case '2':
            value = program[relativeBase + currentIndexValue] || 0;
            break;
    }
    return value;
};

const intcode = (programInput, inputs) => {
    const program = programInput.split(',').map(i => +i);
    let currentIndex = 0;
    let lastUsedInput = 0;
    let running = true;

    let output = [];
    let relativeBase = 0;
    while (running) {
        let currentCommand = program[currentIndex].toString().padStart(5, '0');
        let currentOpcode = currentCommand.substr(3, 2);
        let result = 0,
            value1 = 0,
            value2 = 0;

        switch (currentOpcode) {
            case '01':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1], relativeBase);
                result = value1 + value2;
                program[program[currentIndex + 3]] = result;
                currentIndex += 4;
                break;
            case '02':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1], relativeBase);
                result = value1 * value2;
                program[program[currentIndex + 3]] = result;
                currentIndex += 4;
                break;
            case '03':
                program[program[currentIndex + 1]] = inputs[lastUsedInput];
                lastUsedInput++;
                currentIndex += 2;
                break;
            case '04':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                output.push(value1);
                currentIndex += 2;
                break;
            case '05':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1], relativeBase);
                currentIndex = value1 !== 0 ? value2 : currentIndex + 3;
                break;
            case '06':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1], relativeBase);
                currentIndex = value1 === 0 ? value2 : currentIndex + 3;
                break;
            case '07':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1], relativeBase);
                program[program[currentIndex + 3]] = value1 < value2 ? 1 : 0;
                currentIndex += 4;
                break;
            case '08':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1], relativeBase);
                program[program[currentIndex + 3]] = value1 === value2 ? 1 : 0;
                currentIndex += 4;
                break;
            case '09':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2], relativeBase);
                relativeBase += value1;
                currentIndex += 2;
                break;
            case '99':
                running = false;
                break;
        }
    }

    return { program, output };
};

module.exports = intcode;