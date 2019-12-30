class Intcode {
    constructor(input) {
        this.program = input.split(',').map(i => +i);
        this.currentIndex = 0;
        this.relativeBase = 0;
        this.running = false;
        this.finished = false;
    }

    getParamValue(index, mode) {
        let value = 0;
        let currentIndexValue = this.program[index];
        switch (mode) {
            case '0':
                value = this.program[currentIndexValue] || 0;
                break;
            case '1':
                value = currentIndexValue;
                break;
            case '2':
                value = this.program[this.relativeBase + currentIndexValue] || 0;
                break;
        }
        return value;
    }

    getWriteIndex(index, mode) {
        let newIndex = 0;
        let currentIndexValue = this.program[index];
        switch (mode) {
            case '0':
                newIndex = currentIndexValue || 0;
                break;
            case '2':
                newIndex = this.relativeBase + currentIndexValue;
                break;
        }
        return newIndex;
    }

    reset() {
        this.finished = false;
    }

    run(inputs = []) {
        this.running = true;
        let output = null;

        let remainingInputs = inputs.slice();

        while (this.running) {
            let currentCommand = this.program[this.currentIndex].toString().padStart(5, '0');
            let currentOpcode = currentCommand.substr(3, 2);
            let result = 0,
                value1 = 0,
                value2 = 0,
                value3 = 0;

            switch (currentOpcode) {
                case '01':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    value2 = this.getParamValue(this.currentIndex + 2, currentCommand[1]);
                    value3 = this.getWriteIndex(this.currentIndex + 3, currentCommand[0]);
                    result = value1 + value2;
                    this.program[value3] = result;
                    this.currentIndex += 4;
                    break;
                case '02':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    value2 = this.getParamValue(this.currentIndex + 2, currentCommand[1]);
                    value3 = this.getWriteIndex(this.currentIndex + 3, currentCommand[0]);
                    result = value1 * value2;
                    this.program[value3] = result;
                    this.currentIndex += 4;
                    break;
                case '03':
                    if (remainingInputs.length === 0) {
                        this.running = false;
                        break;
                    }

                    value1 = this.getWriteIndex(this.currentIndex + 1, currentCommand[2]);
                    this.program[value1] = remainingInputs.shift();
                    this.currentIndex += 2;
                    break;
                case '04':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    this.currentIndex += 2;
                    output = value1;
                    this.running = false;
                    break;
                case '05':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    value2 = this.getParamValue(this.currentIndex + 2, currentCommand[1]);
                    this.currentIndex = value1 !== 0 ? value2 : this.currentIndex + 3;
                    break;
                case '06':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    value2 = this.getParamValue(this.currentIndex + 2, currentCommand[1]);
                    this.currentIndex = value1 === 0 ? value2 : this.currentIndex + 3;
                    break;
                case '07':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    value2 = this.getParamValue(this.currentIndex + 2, currentCommand[1]);
                    value3 = this.getWriteIndex(this.currentIndex + 3, currentCommand[0]);
                    this.program[value3] = value1 < value2 ? 1 : 0;
                    this.currentIndex += 4;
                    break;
                case '08':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    value2 = this.getParamValue(this.currentIndex + 2, currentCommand[1]);
                    value3 = this.getWriteIndex(this.currentIndex + 3, currentCommand[0]);
                    this.program[value3] = value1 === value2 ? 1 : 0;
                    this.currentIndex += 4;
                    break;
                case '09':
                    value1 = this.getParamValue(this.currentIndex + 1, currentCommand[2]);
                    this.relativeBase += value1;
                    this.currentIndex += 2;
                    break;
                case '99':
                    this.running = false;
                    this.finished = true;
                    break;
            }
        }

        return output;
    }
}

module.exports = Intcode;
