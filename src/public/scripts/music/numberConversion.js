const RomanNumMap = Object.freeze({
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
});

const WordNumMap = Object.freeze({
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
});

/**
 * @param {number} num The positive integer to convert to Roman numerals
 * @returns {string} The converted Roman numeral
 * @contributors Nolan, Chris, Marcus
 */
export function convertToRoman(num) {
    return RomanNumMap[num];
}

/**
 * @param {number} num The positive integer to get the name of
 * @returns {string} The name of the inputted number
 * @contributors Nolan, Chris, Marcus
 */
export function convertToWord(num) {
    return WordNumMap[num];
}