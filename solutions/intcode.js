const getParamValue = (program, index, mode) => {
    return mode === '0' ? program[program[index]] : program[index];
};

const intcode = (programInput, inputs) => {
    const program = programInput.split(',').map(i => +i);
    let currentIndex = 0;
    let lastUsedInput = 0;
    let running = true;

    let lastOutput = 0;
    while (running) {
        let currentCommand = program[currentIndex].toString().padStart(5, '0');
        let currentOpcode = currentCommand.substr(3, 2);
        let result = 0,
            value1 = 0,
            value2 = 0;

        switch (currentOpcode) {
            case '01':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1]);
                result = value1 + value2;
                program[program[currentIndex + 3]] = result;
                currentIndex += 4;
                break;
            case '02':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1]);
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
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                lastOutput = value1;
                currentIndex += 2;
                break;
            case '05':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1]);
                currentIndex = value1 !== 0 ? value2 : currentIndex + 3;
                break;
            case '06':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1]);
                currentIndex = value1 === 0 ? value2 : currentIndex + 3;
                break;
            case '07':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1]);
                program[program[currentIndex + 3]] = value1 < value2 ? 1 : 0;
                currentIndex += 4;
                break;
            case '08':
                value1 = getParamValue(program, currentIndex + 1, currentCommand[2]);
                value2 = getParamValue(program, currentIndex + 2, currentCommand[1]);
                program[program[currentIndex + 3]] = value1 === value2 ? 1 : 0;
                currentIndex += 4;
                break;
            case '99':
                running = false;
                break;
        }
    }

    return { program, lastOutput };
};

module.exports = intcode;
