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

const OrdinalWordMap = Object.freeze({
    1:  "first",
    2:  "second",
    3:  "third",
    4:  "fourth",
    5:  "fifth",
})

/**
 * Converts the inputted number into its Roman numeral counterpart
 * @param {number} num The positive integer to convert to Roman numerals
 * @returns {string} The converted Roman numeral
 * @contributors Nolan, Chris, Marcus
 */
export function convertToRoman(num) {
    return RomanNumMap[num];
}

/**
 * Converts the inputted number into its English counterpart
 * @param {number} num The positive integer to get the name of
 * @returns {string} The name of the inputted number
 * @contributors Nolan, Chris, Marcus
 */
export function convertToWord(num) {
    return WordNumMap[num];
}

/**
 * Gets the inputted number's ordinal English counterpart (eg. 1 => first)
 * @param {number} num Positive integer to get the name of
 * @returns {string} The ordinal name of the inputter number
 * @contributors Nolan
 */
export function convertToOrdinalWord(num) {
    const leastSignificantDigit = num % 10;
    return OrdinalWordMap[leastSignificantDigit];
}