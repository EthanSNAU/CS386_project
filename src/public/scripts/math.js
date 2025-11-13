/**
 * Generates a random integer between inclusiveMin and inclusiveMax (both inclusive)
 * @param {integer} inclusiveMin The minimum integer value (inclusive)
 * @param {integer} inclusiveMax The maximum integer value (inclusive)
 * @returns {integer} A random integer between inclusiveMin and inclusiveMax (both inclusive)
 * @contributors Nolan
 */
export function getRandomInt(inclusiveMin, inclusiveMax) {
    return Math.floor(Math.random() * (inclusiveMax - inclusiveMin + 1)) + inclusiveMin;
}

/**
 * Gets a random element from the inputted array
 * @param {any[]} array The array to fetch a random value from
 * @returns {any} A random element in array
 * @contributors Nolan
 */
export function getRandomArrayElement(array) {
    return array[getRandomInt(0, array.length - 1)];
}

// module.exports = {
//     getRandomInt,
//     getRandomArrayElement
// };