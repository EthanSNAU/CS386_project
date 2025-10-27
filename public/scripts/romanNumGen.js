// this script handles random generation 
let NUM_CHORDS = 4;

// variables for genAlphabet
let key;
const Alphabet = ["A", "B", "C", "D", "E", "F", "G"];
const displayNum = ["1", "2", "3", "4", "5", "6", "7"];

let RomanOrAlphabet = 0;

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
    for(let i = 0; i < 7; i++) {
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

    RomanOrAlphabet = 0;

    // get rid of any whitespace and return
    return result.trim();
}

function numCycle(){
    if (NUM_CHORDS < 7)
    {
        NUM_CHORDS++;
        document.getElementById(`chord${NUM_CHORDS}`).style="visibility:visible";
    }
    else
    {
        for(let i = 2; i <= NUM_CHORDS; i++) 
        {
            document.getElementById(`chord${i}`).style="visibility:hidden";
        }
    NUM_CHORDS = 1;


}
}

function genAlphabet() {

    let result = "";

    // loop 4 times to build the string
    for(let i = 0; i < 7; i++) {
        // generate a random index between 0 and 6
        const randIndex = getRandomInt(0, Alphabet.length - 1);

        // get the alphabet and randomize case
        const AlphabetLtr = Math.random() > 0.5 ? Alphabet[randIndex] : Alphabet[randIndex].toLowerCase();

        // add it to the result string
        result += AlphabetLtr + " " ;

        // display it on the webpage
        const displayElement = document.getElementById(`rootNote${i + 1}`);
        displayElement.textContent = AlphabetLtr;
    }

    RomanOrAlphabet = 1;
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

    // storing key value
    key = Alphabet.indexOf(keyName.charAt(0).toUpperCase);

    // updating either roman or alphabet based on last user input
    if(RomanOrAlphabet == 0)
    {
        genRomanNumeral();
    }
    else if(RomanOrAlphabet == 1)
    {
        genAlphabet();
    }
}