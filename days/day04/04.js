const getValidPasswordCount = (min, max) => {
    let current = min;
    let validPasswords = 0;

    while (current <= max) {
        let currentStr = current.toString();
        let isIncreasing = true;
        let hasRepeatingAnyLength = false;
        for (let i = 1; i < currentStr.length; i++) {
            if (currentStr[i] < currentStr[i - 1]) {
                isIncreasing = false;
                break;
            }

            if (currentStr[i] === currentStr[i - 1]) {
                hasRepeatingAnyLength = true;
            }
        }

        if (isIncreasing && hasRepeatingAnyLength) {
            validPasswords++;
        }

        current++;
    }

    return validPasswords;
};

const getValidPasswordCountPart2 = (min, max) => {
    let current = min;
    let validPasswords = 0;

    while (current <= max) {
        let currentStr = current.toString();
        let isIncreasing = true;
        let hasRepeatingDouble = false;
        let currentRepeatingLength = 1;
        for (let i = 1; i < currentStr.length; i++) {
            if (currentStr[i] < currentStr[i - 1]) {
                isIncreasing = false;
                break;
            }

            if (currentStr[i] === currentStr[i - 1]) {
                currentRepeatingLength++;
            } else {
                if (currentRepeatingLength === 2 && !hasRepeatingDouble) {
                    hasRepeatingDouble = true;
                }
                currentRepeatingLength = 1;
            }
        }

        if (currentRepeatingLength === 2 && !hasRepeatingDouble) {
            hasRepeatingDouble = true;
        }

        if (isIncreasing && hasRepeatingDouble) {
            validPasswords++;
        }

        current++;
    }

    return validPasswords;
};

module.exports = {
    day: 4,
    getValidPasswordCount: getValidPasswordCount,
    getValidPasswordCountPart2: getValidPasswordCountPart2,
};
