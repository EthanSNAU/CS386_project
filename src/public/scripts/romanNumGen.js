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

/**
 * Updates the scale on the webpage
 * @param {string} scaleName The name of the selected scale
 * @contributors Ethan
 */
function getScale(scaleName)
{
    // creates a display element for updating the webpage
    const display = document.getElementById('scaleDisplay');

    //updates the display with the selected scale name
    display.textContent = `scale: ${scaleName}`;
}


/**
 * allows user to change chords to be 7ths, 9ths, and 11ths, just by clicking the chord progression display
 * @contributors Ethan
 */
window.onload = function() {
    // selects all Roman numeral elements
    const rootNotes = document.querySelectorAll('.rootDisplay');

    // goes through each iteration
    rootNotes.forEach(rootNote => {
        // adds the click event listener
        rootNote.addEventListener('click', function() {
            
            // grabs upper figure element for changing
            const upperFigure = this.nextElementSibling; 

            // check
            if (upperFigure && upperFigure.classList.contains('upperFigureDisplay')) {
                
                const currentText = upperFigure.textContent;
                let nextText = '';

                // cycles through clicks to change upper figure display
                if (currentText === '') 
                {
                    nextText = '7';
                } 
                else if (currentText === '7') 
                {
                    nextText = '9';
                } 
                else if (currentText === '9') 
                {
                    nextText = '11';
                } 
                else if (currentText === '11') 
                {
                    nextText = '';
                }

                // updatres upper figure
                upperFigure.textContent = nextText;
            }
        });
    });
};

/**
 * Generate random bass notes for each chord and displays them
 * @returns {string} A string of bass notes
 * @contributors Adolfo
 */
function genBassNotes() 
{
    // Common bass notes
    const bassNotes = ["C", "D", "E", "F", "G", "A", "B"];
    let result = "";

    for (let i = 0; i < NUM_CHORDS; i++) 
        {
        const randIndex = getRandomInt(0, bassNotes.length - 1);
        const randBassNote = bassNotes[randIndex];

        result += randBassNote + " ";

        const displayElement = document.getElementById(`bassNote${i + 1}`);
        if (displayElement) {
            displayElement.textContent = randBassNote;
        }
    }

    return result.trim();
}

/**
 * Letting the user to add note to the chords (bass notes)
 * 
 */
window.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the class "bassNoteDisplay"
    const bassNoteElements = document.querySelectorAll(".bassNoteDisplay");

    // Add click event listener to each bass note
    bassNoteElements.forEach((bassNote) => {
        bassNote.addEventListener("click", () => {
            // Prompt the user for a new note
            const currentNote = bassNote.textContent || "";
            const newNote = prompt("Enter a new bass note (e.g., C, D#, F):", currentNote);

            // Update the bass note if valid input is given
            if (newNote !== null && newNote.trim() !== "") {
                bassNote.textContent = newNote.trim();
            }
        });
    });
});


module.exports = { getRandomInt, genRomanNumeral, genInversions, clearInversions, getKey, NUM_CHORDS, getScale, genBassNotes };
