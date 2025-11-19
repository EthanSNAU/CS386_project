// romanNumGen.js
import { ChordProgression } from "./music/chordProgression.js";
import { PitchClass, ChordQuality, ReferentialScale } from "./music/enums";
import { getRandomArrayElement, getRandomInt, capitalizeFirstChar } from "./util.js";

/**
 * Number of chords in the progression on startup
 * @constant
 */
export const DEFAULT_NUM_CHORDS = 4;

/**
 * Maximum number of chords allowed in the progression
 */
export const MAX_CHORDS = 7;

let isDisplayingAlphabet = false;
const chordProgression = new ChordProgression(PitchClass.C, ReferentialScale.IONIAN_MAJOR);

/**
 * Updates the displayed chord names
 * @contributors Marcus, Nolan
 */
export function updateChordNameDisplay() {
    const numChords = chordProgression.getNumChords();
    let names = "";

    if (isDisplayingAlphabet) {
        for (let i = 0; i < numChords; i++) {
            names += chordProgression.getChordRepresentation(i).alphabetical.name;
            if (i < numChords - 1) names += ", ";
        }
    } else {
        for (let i = 0; i < numChords; i++) {
            names += chordProgression.getChordRepresentation(i).roman.name;
            if (i < numChords - 1) names += ", ";
        }
    }

    document.getElementById("wordDisplay").textContent = capitalizeFirstChar(names);
}


/**
 * Updates the displayed chord symbols
 * @contributors Nolan
 */
export function updateChordSymbolDisplay() {
    for (let i = 0; i < chordProgression.getNumChords(); i++) {
        const rootNoteDisplay = document.getElementById(`rootNote${i}`);
        const upperFigureDisplay = document.getElementById(`upperFigure${i}`);
        const lowerFigureDisplay = document.getElementById(`lowerFigure${i}`);
        const bassFigureDisplay = document.getElementById(`bassFigure${i}`);

        const representation = chordProgression.getChordRepresentation(i);

        if (isDisplayingAlphabet) {
            rootNoteDisplay.textContent = representation.alphabetical.symbol;
            upperFigureDisplay.textContent = representation.alphabetical.upperFigure;
            lowerFigureDisplay.textContent = representation.alphabetical.lowerFigure;
            bassFigureDisplay.textContent = representation.alphabetical.bassFigure;
        } else {
            rootNoteDisplay.textContent = representation.roman.symbol;
            upperFigureDisplay.textContent = representation.roman.upperFigure;
            lowerFigureDisplay.textContent = representation.roman.lowerFigure;
            bassFigureDisplay.textContent = representation.roman.bassFigure;
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
    chordProgression.addChord(numChords);

    // create the root note
    let newRootNoteDisplay = document.createElement("p");
    newRootNoteDisplay.id = `rootNote${numChords}`;
    newRootNoteDisplay.className = "rootNoteDisplay";

    // newRootNoteDisplay.addEventListener('click', function(event) {
    //     Cycle through possible chord qualities
    // });

    let newUpperFigureDisplay = document.createElement("p");
    newUpperFigureDisplay.id = `upperFigure${numChords}`;
    newUpperFigureDisplay.className = "upperFigureDisplay";
    // newUpperFigureDisplay.addEventListener("click", (event) => {
    //     Remove the figure (?)
    // });

    let newLowerFigureDisplay = document.createElement("p");
    newLowerFigureDisplay.id = `lowerFigure${numChords}`;
    newLowerFigureDisplay.className = "lowerFigureDisplay";
    // newLowerFigureDisplay.addEventListener("click", (event) => {
    //     Remove the figure (?)
    // });

    let newBassFigureDisplay = document.createElement("p");
    newBassFigureDisplay.id = `bassFigure${numChords}`;
    newBassFigureDisplay.className = "bassFigureDisplay";

    let newChord = document.createElement("div");
    newChord.id = `chord${numChords}`;
    newChord.className = "chordDisplay";

    newChord.appendChild(newRootNoteDisplay);
    newChord.appendChild(newUpperFigureDisplay);
    newChord.appendChild(newLowerFigureDisplay);
    newChord.appendChild(newBassFigureDisplay);

    document.getElementById("chordProgressionDisplay").appendChild(newChord);

    updateChordSymbolDisplay();
    updateChordNameDisplay();
}

/**
 * Randomizes the displayed chords' root notes
 * @contributors Chris, Nolan, Ben
 */
export function randomizeChordRootNotes() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        const randomPitchClass = getRandomArrayElement(PitchClass.SUPPORTED_PITCH_CLASSES);
        chordProgression.setChordRootNote(i, randomPitchClass);
        chordProgression.setChordQuality(i, ChordQuality.MAJOR_TRIAD);
    }

    updateChordSymbolDisplay();
    updateChordNameDisplay();
}

/**
 * Randomizes the displayed chords' qualities (i.e. major vs. minor vs. diminished)
 * @contributors Nolan
 */
export function randomizeChordQualities() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        const randomQuality = getRandomArrayElement(ChordQuality.SUPPORTED_QUALITIES);
        chordProgression.setChordQuality(i, randomQuality);
    }

    updateChordSymbolDisplay();
    updateChordNameDisplay();
}

/**
 * Randomizes the displayed chord's inversions
 * @contributors Nolan
 */
export function randomizeChordInversions() {
    const maxNumInversions = 2;
    const minNumInversions = -2;

    const numChords = chordProgression.getNumChords();

    for (let i = 0; i < numChords; i++) {
        const numInversions = getRandomInt(minNumInversions, maxNumInversions);
        chordProgression.invertChord(i, numInversions);
    }

    updateChordSymbolDisplay();
    updateChordNameDisplay();
}


/**
 * Toggles the current display mode between alphabetical and Roman numeral
 * @contributors Nolan, Ben
 */
export function toggleChordDisplayType() {
    isDisplayingAlphabet = !isDisplayingAlphabet;

    updateChordSymbolDisplay();
    updateChordNameDisplay();
}

/**
 * Updates the root key on the webpage
 * @param {string} keyName The name of the selected key
 * @contributors Ethan, Nolan
 */
export function setKey(keyName) {
    // creates a display element for updating the webpage
    const display = document.getElementById('rootKeyDisplay');

    // updates the display with the selected key name
    display.textContent = `Key: ${keyName}`;
}


/**
 * Updates the scale on the webpage
 * @param {string} scaleName The name of the selected scale
 * @contributors Ethan
 */
export function setReferentialScale(scaleName) {
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

    document.getElementById("randomizeChordRootNotesButton").addEventListener("click", randomizeChordRootNotes);
    document.getElementById("randomizeChordQualitiesButton").addEventListener("click", randomizeChordQualities);
    document.getElementById("randomizeChordInversionsButton").addEventListener("click", randomizeChordInversions);
    document.getElementById("toggleChordDisplayTypeButton").addEventListener("click", toggleChordDisplayType);
    document.getElementById("addChordButton").addEventListener("click", addChord);

    document.getElementById("setRootKeySelection").onchange = (event) => setKey(event.target.value);
    document.getElementById("setScaleSelection").onchange = (event) => setReferentialScale(event.target.value);
};