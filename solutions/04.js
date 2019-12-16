const getValidPasswordCount = (min, max) => {
    let current = min;
    let validPasswords = 0;

    while (current <= max) {
        let currentStr = current.toString();
        let isIncreasing = true;
        let hasRepeating = false;
        for (let i = 1; i < currentStr.length; i++) {
            if (currentStr[i] < currentStr[i-1]) {
                isIncreasing = false;
                break;
            }

            if (currentStr[i] === currentStr[i-1]) {
                hasRepeating = true;
            }
        }

        if (isIncreasing && hasRepeating) {
            validPasswords++;
        }

        current++;
    }

    return validPasswords;
}

module.exports = {
    day: 4,
    getValidPasswordCount: getValidPasswordCount,
};
