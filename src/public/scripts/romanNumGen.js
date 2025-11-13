// romanNumGen.js
import { ChordProgression } from "./music/chordProgression.js";
import { REFERENTIAL_SCALE } from "./music/scale.js";
import { PITCH_CLASS, SUPPORTED_PITCH_CLASSES } from "./music/pitchClass.js";
import { SUPPORTED_CHORD_QUALITIES } from "./music/chord.js";
import { getRandomArrayElement } from "./math.js";

export const DEFAULT_NUM_CHORDS = 4;
export const MAX_CHORDS = 7;
let isDisplayingAlphabet = false;
const chordProgression = new ChordProgression(PITCH_CLASS.C, REFERENTIAL_SCALE.IONIAN_MAJOR);

/**
 * Updates the displayed names of chord progressions
 * @contributors Marcus, Nolan
 */
export function updateChordNameDisplay() {
    const numChords = chordProgression.getNumChords();
    let names = [];

    if (isDisplayingAlphabet) {
        for (let i = 0; i < numChords; i++) {
            names.push(chordProgression.getChordRepresentation(i).alphabeticalName);
        }
    } else {
        for (let i = 0; i < numChords; i++) {
            names.push(chordProgression.getChordRepresentation(i).romanName);
        }
    }

    document.getElementById("wordDisplay").textContent = names;
}


export function updateChordSymbolDisplay() {
    if (isDisplayingAlphabet) {
        for (let i = 0; i < chordProgression.getNumChords(); i++) {
            const displayElement = document.getElementById(`rootNote${i}`);
            displayElement.textContent = chordProgression.getChordRepresentation(i).alphabeticalSymbol;
        }
    } else {
        for (let i = 0; i < chordProgression.getNumChords(); i++) {
            const displayElement = document.getElementById(`rootNote${i}`);
            displayElement.textContent = chordProgression.getChordRepresentation(i).romanSymbol;
        }
    }
}


/**
 * Adds a chord to the chord display
 * @contributors Nolan, Ethan, Ben
 */
export function addChord() {
    const numChords = chordProgression.getNumChords();
    if (numChords >= MAX_CHORDS) return;

    // add the chord to the progression manager
    chordProgression.addChord();
    const chordRepresentation = chordProgression.getChordRepresentation(numChords);

    // create the root note
    let newRootNoteDisplay = document.createElement("p");
    newRootNoteDisplay.id = `rootNote${numChords}`;
    newRootNoteDisplay.className = "rootNoteDisplay";

    if (isDisplayingAlphabet) {
        newRootNoteDisplay.textContent = chordRepresentation.alphabeticalSymbol;
    } else {
        newRootNoteDisplay.textContent = chordRepresentation.romanSymbol;
    }

    // newRootNoteDisplay.addEventListener('click', function(event) {
    //     const upperFigure = event.target.nextElementSibling; 
    //     if (upperFigure && upperFigure.classList.contains('upperFigureDisplay')) {
    //         const currentText = upperFigure.textContent;
    //         let nextText = '';

    //         // cycles through clicks to change upper figure display
    //         if (currentText === '') {
    //             nextText = '7';
    //         } else if (currentText === '7') {
    //             nextText = '9';
    //         } else if (currentText === '9') {
    //             nextText = '11';
    //         } else if (currentText === '11') {
    //             nextText = '';
    //         }

    //         // updates upper figure
    //         upperFigure.textContent = nextText;
    //     }
    // });

    let newUpperFigureDisplay = document.createElement("p");
    newUpperFigureDisplay.id = `upperFigure${numChords}`;
    newUpperFigureDisplay.className = "upperFigureDisplay";
    // newUpperFigureDisplay.addEventListener("click", (event) => {
    //     // Ask the user if they want to remove the note
    //     const shouldRemove = confirm(`Do you want to remove the note "${event.target.textContent}"?`);
    //     if (shouldRemove) {
    //         event.target.textContent = ""; // remove the note
    //     }
    // });

    let newLowerFigureDisplay = document.createElement("p");
    newLowerFigureDisplay.id = `lowerFigure${numChords}`;
    newLowerFigureDisplay.className = "lowerFigureDisplay";
    // newLowerFigureDisplay.addEventListener("click", (event) => {
    //     // Ask the user if they want to remove the note
    //     const shouldRemove = confirm(`Do you want to remove the note "${event.target.textContent}"?`);
    //     if (shouldRemove) {
    //         event.target.textContent = ""; // remove the note
    //     }
    // });

    let newBassNoteDisplay = document.createElement("p");
    newBassNoteDisplay.id = `bassNote${numChords}`;
    newBassNoteDisplay.className = "bassNoteDisplay";
    // newBassNoteDisplay.addEventListener("click", (event) => {
    //     // Prompt the user for a new note
    //     const currentNote = event.target.textContent || "";
    //     const newNote = prompt("Enter a new bass note (e.g., C, D#, F):", currentNote);

    //     // Update the bass note if valid input is given
    //     if (newNote !== null && newNote.trim() !== "") {
    //         event.target.textContent = newNote.trim();
    //     }
    // });

    let newChord = document.createElement("div");
    newChord.id = `chord${numChords}`;
    newChord.className = "chordDisplay";

    newChord.appendChild(newRootNoteDisplay);
    newChord.appendChild(newUpperFigureDisplay);
    newChord.appendChild(newLowerFigureDisplay);
    newChord.appendChild(newBassNoteDisplay);

    document.getElementById("chordProgressionDisplay").appendChild(newChord);
}

/**
 * Generates a random chord progression displays it on the webpage
 * @returns {string} A string containing the chord progression
 * @contributors Chris, Nolan, Ben
 */
export function genRandomRootNotes() {
    const numChords = chordProgression.getNumChords();
    for(let i = 0; i < numChords; i++) {
        const randomPitchClass = getRandomArrayElement(SUPPORTED_PITCH_CLASSES);
        chordProgression.setChord(i, randomPitchClass, );
    }

    updateChordSymbolDisplay();
    updateChordNameDisplay();
}



/**
 * Generates a random sequence of chord inversions and displays it on the webpage
 * @returns {string} A string containing the inversions
 * @contributors Nolan
 */
// export function genInversions() {
//     let result = "";
// 
//     for (let i = 0; i < numChordsDisplayed; i++) {
//         const randIndex = getRandomInt(0, inversions.length - 1);
//         const randInversion = inversions[randIndex];
// 
//         result += randInversion + " ";
// 
//         const upperFigureDisplayElement = document.getElementById(`upperFigure${i + 1}`);
//         const lowerFigureDisplayElement = document.getElementById(`lowerFigure${i + 1}`);
// 
//         if (randInversion === "53") {
//             upperFigureDisplayElement.textContent = "";
//             lowerFigureDisplayElement.textContent = "";
//         } else {
//             upperFigureDisplayElement.textContent = randInversion.charAt(0);
//             lowerFigureDisplayElement.textContent = randInversion.charAt(1);
//         }
//     }
// 
//     return result.trim();
// }


/**
 * Clears the displayed inversions on the webpage
 * @contributors Nolan
 */
// export function clearInversions() {
//     for (let i = 0; i < numChordsDisplayed; i++) {
//         const upperFigureDisplayElement = document.getElementById(`upperFigure${i + 1}`);
//         const lowerFigureDisplayElement = document.getElementById(`lowerFigure${i + 1}`);
// 
//         upperFigureDisplayElement.textContent = "";
//         lowerFigureDisplayElement.textContent = "";
//     }
// }

/**
 * Generate random bass notes for each chord and displays them
 * @returns {string} A string of bass notes
 * @contributors Adolfo, Nolan
 */
// export function genBassNotes() {
//     // Common bass notes
//     let result = "";
// 
//     for (let i = 0; i < numChordsDisplayed; i++) 
//         {
//         let randIndex;
//         let randBassNote;
//         
//         if (isDisplayingAlphabet) {
//             randIndex = getRandomInt(0, alphabetNotes.length - 1);
//             randBassNote = alphabetNotes[randIndex];
//         } else {
//             randIndex = getRandomInt(0, romanNotes.length - 1);
//             randBassNote = romanNotes[randIndex];
//         }
// 
//         result += randBassNote + " ";
// 
//         document.getElementById(`bassNote${i + 1}`).textContent = randBassNote;
//     }
// 
//     return result.trim();
// }


/**
 * Updates the root key on the webpage
 * @param {string} keyName The name of the selected key
 * @contributors Ethan, Nolan
 */
export function setKey(keyName) {
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
export function setScale(scaleName) {
    // creates a display element for updating the webpage
    const display = document.getElementById('scaleDisplay');

    //updates the display with the selected scale name
    display.textContent = `Scale: ${scaleName}`;
}


/**
 * Called on DOM load. Attaches event listeners for hydration.
 * @contributors Ethan, Adolfo, Nolan
 */
export function init() {
    for (let i = 0; i < DEFAULT_NUM_CHORDS; i++) {
        addChord();
    }

    updateChordSymbolDisplay();
    updateChordNameDisplay();

    document.getElementById("randomizeRootNotesButton").addEventListener("click", genRandomRootNotes);
    document.getElementById("addChordButton").addEventListener("click", addChord);
};


// module.exports = { 
//     MAX_CHORDS,
//     addChord,
//     updateChordNameDisplay,
//     setKey,
//     setScale,
//     init
// };