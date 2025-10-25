// this script handles random generation 
const NUM_CHORDS = 4;
/**
 * Generates a random integer between inclusiveMin and inclusiveMax (both inclusive)
 * @param {integer} inclusiveMin The minimum integer value (inclusive)
 * @param {integer} inclusiveMax The maximum integer value (inclusive)
 * @returns {integer} A random integer between inclusiveMin and inclusiveMax (both inclusive)
 * @contributors Nolan
 */
function getRandomInt(inclusiveMin, inclusiveMax) {
    return Math.floor(Math.random() * (inclusiveMax - inclusiveMin + 1)) + inclusiveMin;
}

/**
 * Generates a random chord progression in roman numerals and displays it on the webpage
 * @returns {string} A string containing the chord progression
 * @contributors Chris, Nolan
 */
function genRomanNumeral() {
    // roman numerals from I to VII
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

    let result = "";

    // loop 4 times to build the string
    for(let i = 0; i < NUM_CHORDS; i++) {
        // generate a random index between 0 and 6
        const randIndex = getRandomInt(0, romanNumerals.length - 1);

        // get the Roman numeral and randomize case
        const romanNumeral = Math.random() > 0.5 ? romanNumerals[randIndex] : romanNumerals[randIndex].toLowerCase();

        // add it to the result string
        result += romanNumeral + " " ;

        // display it on the webpage
        const displayElement = document.getElementById(`rootNote${i + 1}`);
        displayElement.textContent = romanNumeral;
    }

    // get rid of any whitespace and return
    return result.trim();
}

/**
 * Generates a random sequence of chord inversions and displays it on the webpage
 * @returns {string} A string containing the inversions
 * @contributors Nolan
 */
function genInversions() {
    // inversion options (root, first, and second inversions for now)
    const inversions = ["53", "63", "64"];
    let result = "";

    for (let i = 0; i < NUM_CHORDS; i++) {
        const randIndex = getRandomInt(0, inversions.length - 1);
        const randInversion = inversions[randIndex];

        result += randInversion + " ";

        const upperFigureDisplayElement = document.getElementById(`upperFigure${i + 1}`);
        const lowerFigureDisplayElement = document.getElementById(`lowerFigure${i + 1}`);

        if (randInversion === "53") {
            upperFigureDisplayElement.textContent = "";
            lowerFigureDisplayElement.textContent = "";
        } else {
            upperFigureDisplayElement.textContent = randInversion.charAt(0);
            lowerFigureDisplayElement.textContent = randInversion.charAt(1);
        }
    }

    return result.trim();
}

/**
 * Clears the displayed inversions on the webpage
 * @contributors Nolan
 */
function clearInversions() {
    for (let i = 0; i < NUM_CHORDS; i++) {
        const upperFigureDisplayElement = document.getElementById(`upperFigure${i + 1}`);
        const lowerFigureDisplayElement = document.getElementById(`lowerFigure${i + 1}`);

        upperFigureDisplayElement.textContent = "";
        lowerFigureDisplayElement.textContent = "";

    }
}

/**
 * Updates the root key on the webpage
 * @param {string} keyName The name of the selected key
 * @contributors Ethan
 */
function getKey(keyName)
{
    // creates a display element for updating the webpage
    const display = document.getElementById('keyDisplay');

    //updates the display with the selected key name
    display.textContent = `key: ${keyName}`;
}

module.exports = { getRandomInt, genRomanNumeral, genInversions, clearInversions, getKey, NUM_CHORDS };