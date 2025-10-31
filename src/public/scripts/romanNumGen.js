// romanNumGen.js
const DEFAULT_NUM_CHORDS = 4;
const MAX_CHORDS = 7;
const romanNotes = ["I", "II", "III", "IV", "V", "VI", "VII"];
const alphabetNotes = ["A", "B", "C", "D", "E", "F", "G"];
const inversions = ["53", "63", "64"]; // root, first, and second inversions respectively
const chordNameDictionary = {
    // alphabetical characters
    "A": "A major",
    "Am": "A minor",
    "B": "B major",
    "Bm": "B minor",
    "C": "C major",
    "Cm": "C minor",
    "D": "D major",
    "Dm": "D minor",
    "E": "E major",
    "Em": "E minor",
    "F": "F major",
    "Fm": "F minor",
    "G": "G major",
    "Gm": "G minor",
    "Cmaj7": "C major seven",
    "G7": "G dominant seven",

    // roman numerals
    "I": "One",
    "i": "One minor",
    "II": "Two",
    "ii": "Two minor",
    "III": "Three",
    "iii": "Three minor",
    "IV": "Four",
    "iv": "Four minor",
    "V": "Five",
    "v": "Five minor",
    "VI": "Six",
    "vi": "Six minor",
    "VII": "Seven",
    "vii": "Seven minor"
};

let numChordsDisplayed = 0;
let isDisplayingAlphabet = false; // currently unused
let currentProgression = "";

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
 * Converts chord symbols (like "Cmaj7") into words.
 * Example: Cmaj7 -> "C major seven"
 * @param {string} chordSymbol
 * @returns {string}
 * @contributors Marcus, Nolan
 */
function getChordName(chordSymbol){
    return chordNameDictionary[chordSymbol] || "Unknown chord";
}


/**
 * Converts a sequence of chord symbols into readable text.
 * @param {string} numeral The chord symbol ("V", "Am", etc.)
 * @returns {string} Descriptive chord name ("Five major", "A minor", etc.)
 * @contributors Marcus, Nolan
 */
function convertProgressionToChordNames(progressionString){
    const names = progressionString.split(" ").map(symbol => {
        return getChordName(symbol);
    });

    return names.join(" ");
}


/**
 * Updates the displayed names of chord progressions
 * @contributors Marcus, Nolan
 */
function updateChordNameDisplay() {
    const words = convertProgressionToChordNames(currentProgression);
    document.getElementById("wordDisplay").textContent = words;
}


/**
 * Adds a chord to the chord display
 * @contributors Nolan, Ethan
 */
function addChordToDisplay() {
    numChordsDisplayed++;

    let newRootNoteDisplay = document.createElement("p");
    newRootNoteDisplay.id = `rootNote${numChordsDisplayed}`;
    newRootNoteDisplay.className = "rootNoteDisplay";
    if (isDisplayingAlphabet) {
        newRootNoteDisplay.textContent = "C";
        currentProgression += " C"
    } else {
        newRootNoteDisplay.textContent = "I";
        currentProgression += " I"
    }
    newRootNoteDisplay.addEventListener('click', function(event) {
        const upperFigure = event.target.nextElementSibling; 
        if (upperFigure && upperFigure.classList.contains('upperFigureDisplay')) {
            const currentText = upperFigure.textContent;
            let nextText = '';

            // cycles through clicks to change upper figure display
            if (currentText === '') {
                nextText = '7';
            } else if (currentText === '7') {
                nextText = '9';
            } else if (currentText === '9') {
                nextText = '11';
            } else if (currentText === '11') {
                nextText = '';
            }

            // updates upper figure
            upperFigure.textContent = nextText;
        }
    });

    let newUpperFigureDisplay = document.createElement("p");
    newUpperFigureDisplay.id = `upperFigure${numChordsDisplayed}`;
    newUpperFigureDisplay.className = "upperFigureDisplay";
    newUpperFigureDisplay.addEventListener("click", (event) => {
        // Ask the user if they want to remove the note
        const shouldRemove = confirm(`Do you want to remove the note "${event.target.textContent}"?`);
        if (shouldRemove) {
            event.target.textContent = ""; // remove the note
        }
    });

    let newLowerFigureDisplay = document.createElement("p");
    newLowerFigureDisplay.id = `lowerFigure${numChordsDisplayed}`;
    newLowerFigureDisplay.className = "lowerFigureDisplay";
    newLowerFigureDisplay.addEventListener("click", (event) => {
        // Ask the user if they want to remove the note
        const shouldRemove = confirm(`Do you want to remove the note "${event.target.textContent}"?`);
        if (shouldRemove) {
            event.target.textContent = ""; // remove the note
        }
    });

    let newBassNoteDisplay = document.createElement("p");
    newBassNoteDisplay.id = `baseNote${numChordsDisplayed}`;
    newBassNoteDisplay.className = "baseNoteDisplay";
    newBassNoteDisplay.addEventListener("click", (event) => {
        // Prompt the user for a new note
        const currentNote = event.target.textContent || "";
        const newNote = prompt("Enter a new bass note (e.g., C, D#, F):", currentNote);

        // Update the bass note if valid input is given
        if (newNote !== null && newNote.trim() !== "") {
            event.target.textContent = newNote.trim();
        }
    });

    let newChord = document.createElement("div");
    newChord.id = `chord${numChordsDisplayed}`;
    newChord.className = "chordDisplay";

    newChord.appendChild(newRootNoteDisplay);
    newChord.appendChild(newUpperFigureDisplay);
    newChord.appendChild(newLowerFigureDisplay);
    newChord.appendChild(newBassNoteDisplay);

    document.getElementById("chordProgressionDisplay").appendChild(newChord);
}


/**
 * Increments the number of chords being displayed in the web page, looping to one if at capacity.
 * @contributors Ben, Nolan
 */
function incrementNumChords() {
    if (numChordsDisplayed < MAX_CHORDS) {
        addChordToDisplay();
    } else {
        for (let i = 2; i <= MAX_CHORDS; i++) {
            document.getElementById(`chord${i}`).remove();
        }

        currentProgression = currentProgression.split(" ")[0];
        numChordsDisplayed = 1;
    }

    updateChordNameDisplay();
}


/**
 * Generates a random chord progression in roman numerals and displays it on the webpage
 * @returns {string} A string containing the chord progression
 * @contributors Chris, Nolan
 */
function genRomanNumeral() {
    let result = "";

    // loop 4 times to build the string
    for(let i = 0; i < numChordsDisplayed; i++) {
        // generate a random index between 0 and 6
        const randIndex = getRandomInt(0, romanNotes.length - 1);

        // get the Roman numeral and randomize case
        const romanNumeral = Math.random() > 0.5 ? romanNotes[randIndex] : romanNotes[randIndex].toLowerCase();

        // add it to the result string
        result += romanNumeral + " ";

        // display it on the webpage
        const displayElement = document.getElementById(`rootNote${i + 1}`);
        displayElement.textContent = romanNumeral;
    }

    isDisplayingAlphabet = false;
    currentProgression = result.trim();

    updateChordNameDisplay();

    return currentProgression;
}


/**
 * Generates a random chord progression in alphabetical characters and displays it on the webpage
 * @returns {string} 
 * @contributors Ben, Nolan
 */
function genAlphabet() {
    let result = "";

    for(let i = 0; i < numChordsDisplayed; i++) {
        // generate a random index between 0 and 6
        const randIndex = getRandomInt(0, alphabetNotes.length - 1);

        // get the alphabet and randomize major/minor
        let symbol = alphabetNotes[randIndex];
        if (Math.random() > 0.5) symbol += "m";

        // add it to the result string
        result += symbol + " " ;

        // display it on the webpage
        const displayElement = document.getElementById(`rootNote${i + 1}`);
        displayElement.textContent = symbol;
    }

    isDisplayingAlphabet = true;
    currentProgression = result.trim();

    updateChordNameDisplay();

    return currentProgression;
}


/**
 * Generates a random sequence of chord inversions and displays it on the webpage
 * @returns {string} A string containing the inversions
 * @contributors Nolan
 */
function genInversions() {
    let result = "";

    for (let i = 0; i < numChordsDisplayed; i++) {
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
    for (let i = 0; i < numChordsDisplayed; i++) {
        const upperFigureDisplayElement = document.getElementById(`upperFigure${i + 1}`);
        const lowerFigureDisplayElement = document.getElementById(`lowerFigure${i + 1}`);

        upperFigureDisplayElement.textContent = "";
        lowerFigureDisplayElement.textContent = "";
    }
}


/**
 * Generate random bass notes for each chord and displays them
 * @returns {string} A string of bass notes
 * @contributors Adolfo
 */
function genBassNotes() {
    // Common bass notes
    let result = "";

    for (let i = 0; i < numChordsDisplayed; i++) 
        {
        const randIndex = getRandomInt(0, bassNotes.length - 1);
        const randBassNote = alphabetNotes[randIndex];

        result += randBassNote + " ";

        const displayElement = document.getElementById(`bassNote${i + 1}`);
        if (displayElement) {
            displayElement.textContent = randBassNote;
        }
    }

    return result.trim();
}


/**
 * Updates the root key on the webpage
 * @param {string} keyName The name of the selected key
 * @contributors Ethan, Nolan
 */
function setKey(keyName) {
    // creates a display element for updating the webpage
    const display = document.getElementById('keyDisplay');

    // updates the display with the selected key name
    display.textContent = `Key: ${keyName}`;
}


/**
 * Updates the scale on the webpage
 * @param {string} scaleName The name of the selected scale
 * @contributors Ethan
 */
function setScale(scaleName) {
    // creates a display element for updating the webpage
    const display = document.getElementById('scaleDisplay');

    //updates the display with the selected scale name
    display.textContent = `Scale: ${scaleName}`;
}


/**
 * Called on DOM load. Attaches event listeners for hydration.
 * @contributors Ethan, Adolfo, Nolan
 */
function init() {
    for (let i = 0; i < DEFAULT_NUM_CHORDS; i++) {
        addChordToDisplay();
    }
    currentProgression = currentProgression.trim();
    updateChordNameDisplay();
};


// TODO: update this
module.exports = { 
    MAX_CHORDS,
    getChordName,
};