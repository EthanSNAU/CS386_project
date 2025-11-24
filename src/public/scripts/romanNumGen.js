// romanNumGen.js
import Chord from "./music/chord.js";
import ChordProgression from "./music/chordProgression.js";
import ChordRepresentationObserver from "./music/chordRepresentationObserver.js";
import Scale from "./music/scale.js";
import { PitchClass, ChordQuality, ReferentialScale } from "./music/enums";
import { getRandomArrayElement, getRandomInt, capitalizeFirstChar } from "./util.js";

/**
 * Number of chords in the progression on startup
 * @constant
 */
export const DEFAULT_NUM_CHORDS = 4;

/**
 * Maximum number of chords allowed in the progression
 * @constant
 */
export const MAX_CHORDS = 7;

/**
 * True if the chord progression is displaying alphabetical symbols/names, false otherwise
 */
let isDisplayingAlphabet = false;

/**
 * Chord progression object used to manage existing chords
 */
const chordProgression = new ChordProgression(new Scale(PitchClass.A, ReferentialScale.IONIAN_MAJOR));


/**
 * Updates a displayed chord's symbol and name
 * @param {number} index Integer index of the chord to update
 * @contributors Marcus, Nolan
 */
export function updateChordDisplay(index) {
    const representation = chordProgression.getChord(index).getRepresentation();
    
    const rootNoteDisplay = document.getElementById(`rootNote${index}`);
    const upperFigureDisplay = document.getElementById(`upperFigure${index}`);
    const lowerFigureDisplay = document.getElementById(`lowerFigure${index}`);
    const bassFigureDisplay = document.getElementById(`bassFigure${index}`);
    const nameDisplay = document.getElementById(`chordName${index}`);

    if (isDisplayingAlphabet) {
        rootNoteDisplay.textContent = representation.alphabetical.symbol;
        upperFigureDisplay.textContent = representation.alphabetical.upperFigure;
        lowerFigureDisplay.textContent = representation.alphabetical.lowerFigure;
        bassFigureDisplay.textContent = representation.alphabetical.bassFigure;
        nameDisplay.textContent = capitalizeFirstChar(representation.alphabetical.name);
    } else {
        rootNoteDisplay.textContent = representation.roman.symbol;
        upperFigureDisplay.textContent = representation.roman.upperFigure;
        lowerFigureDisplay.textContent = representation.roman.lowerFigure;
        bassFigureDisplay.textContent = representation.roman.bassFigure;
        nameDisplay.textContent = capitalizeFirstChar(representation.roman.name);
    }
}


/**
 * Updates all chord displays
 * @contributors Nolan
 */
export function updateAllChordDisplays() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        updateChordDisplay(i);
    }
}


/**
 * Adds a chord to the chord display
 * @contributors Nolan, Ethan, Ben
 */
export function addChord() {

    const minNumInversions = -2;
    const maxNumInversions = 2;
    
    const numChords = chordProgression.getNumChords();
    if (numChords >= MAX_CHORDS) return;

    // add the chord to the progression manager
    const scale = chordProgression.getScale();

    let newChord = new Chord(scale.getRootPitchClass());
    newChord.addRepresentationObserver(new ChordRepresentationObserver(scale))

    chordProgression.addChord(numChords, newChord);

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
    // newBassFigureDisplay.addEventListener("click", (event) => {
    //     Remove the figure (?)
    // });

    let newChordSymbolDisplay = document.createElement("div");
    newChordSymbolDisplay.id = `chordSymbol${numChords}`;
    newChordSymbolDisplay.className = "chordSymbolDisplay";

    newChordSymbolDisplay.appendChild(newRootNoteDisplay);
    newChordSymbolDisplay.appendChild(newUpperFigureDisplay);
    newChordSymbolDisplay.appendChild(newLowerFigureDisplay);
    newChordSymbolDisplay.appendChild(newBassFigureDisplay);

    let newChordNameDisplay = document.createElement("p");
    newChordNameDisplay.id = `chordName${numChords}`;
    newChordNameDisplay.className = "chordNameDisplay";

    let chordNameButton = document.createElement('button');

    chordNameButton.addEventListener("click", () => {
        if (chordNameButton.classList.toggle("active")) {
            showChordName(numChords);
        } else {
            hideChordName(numChords);
        }
    });
    

    let changeInversion = document.createElement('button');

    changeInversion.addEventListener("click", () => {
    randomizeChordInversion(numChords, minNumInversions, maxNumInversions)});

    let newChordDisplay = document.createElement("div");
    newChordDisplay.id = `chord${numChords}`;
    newChordDisplay.className = `chordDisplay`;
    newChordDisplay.appendChild(newChordSymbolDisplay);
    newChordDisplay.appendChild(newChordNameDisplay);
    newChordDisplay.appendChild(chordNameButton);
    newChordDisplay.appendChild(changeInversion);

    const chordProgressionDisplay = document.getElementById("chordProgressionDisplay");
    chordProgressionDisplay.appendChild(newChordDisplay);

    updateChordDisplay(numChords);
}


/**
 * Changes a chord's root note and updates the display
 * @param {number} index Integer index of the chord to modify
 * @param {PitchClass} pitchClass Pitch class of the chord's new root note
 * @contributors Nolan
 */
export function setChordRootNote(index, pitchClass) {
    chordProgression.getChord(index).transposeTo(pitchClass);
    updateChordDisplay(index);
}


/**
 * Sets a chord's root note to a random pitch classs and updates the display
 * @param {number} index Integer index of the chord to modify
 * @contributors Nolan
 */
export function randomizeChordRootNote(index) {
    setChordRootNote(index, getRandomArrayElement(PitchClass.SUPPORTED_PITCH_CLASSES));
}


/**
 * Randomizes all the displayed chords' root notes
 * @contributors Chris, Nolan, Ben
 */
export function randomizeAllChordRootNotes() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        randomizeChordRootNote(i);
    }
}


/**
 * Sets an individual chord's quality and updates the display
 * @param {number} index Integer index of the chord to modify
 * @param {ChordQuality} quality Quality of the new chord
 * @contributors Nolan
 */
export function setChordQuality(index, quality) {
    chordProgression.getChord(index).setQuality(quality);
    updateChordDisplay(index);
}


/**
 * Sets a chord's quality to a random quality and updates the display
 * @param {number} index Integer index of the chord to modify
 * @contributors Nolan
 */
export function randomizeChordQuality(index) {
    const randomQuality = getRandomArrayElement (ChordQuality.SUPPORTED_QUALITIES);
    setChordQuality(index, randomQuality);
}

/**
 * Sets a chord's quality to a random triad quality and updates the display
 * @param {number} index Integer index of the chord to modify
 * @contributors Chris
 */
export function randomizeChordQualityTriadOnly(index) {
    const triads = ChordQuality.SUPPORTED_QUALITIES.filter(
        q => ChordQuality.getType(q) === ChordQuality.TRIAD
    );
    setChordQuality(index, getRandomArrayElement(triads));
}

/**
 * Sets a chord's quality to a random seventh quality and updates the display
 * @param {number} index Integer index of the chord to modify
 * @contributors Chris
 */
export function randomizeChordQualitySeventhOnly(index) {
    const sevenths = ChordQuality.SUPPORTED_QUALITIES.filter(
        q => ChordQuality.getType(q) === ChordQuality.SEVENTH
    );
    setChordQuality(index, getRandomArrayElement(sevenths));
}

/**
 * Sets a chord's quality to a random quality from a user-provided list
 * @param {number} index Integer index of the chord to modify
 * @param {ChordQuality[]} allowedQualities Array of allowed chord qualities
 * @contributors Chris
 */
export function randomizeChordQualityFromList(index, allowedQualities) {
    setChordQuality(index, getRandomArrayElement(allowedQualities));
}

/**
 * Sets a chord's quality using weighted random selection and updates the display
 * @param {number} index Integer index of the chord to modify
 * @param {{quality: ChordQuality, weight: number}[]} weights Array of weighted chord qualities
 * @contributors Chris
 */
export function randomizeChordQualityWeighted(index, weights) {
    const total = weights.reduce((sum, w) => sum + w.weight, 0);
    let r = Math.random() * total;

    for (const w of weights) {
        if (r < w.weight) {
            setChordQuality(index, w.quality);
            return;
        }
        r -= w.weight;
    }
}

/**
 * Randomizes all chords' qualities
 * @contributors Nolan
 */
export function randomizeAllChordQualities() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        randomizeChordQuality(i);
    }
}


/**
 * Inverts a chord and updates the chord display
 * @param {number} index         Integer index of the chord to modify
 * @param {number} numInversions The (integer) number of times to invert the chord. Positive values indicate inverting up
 *                               while negative values indicate inverting down.
 * @contributors Nolan
 */
export function invertChord(index, numInversions) {
    chordProgression.getChord(index).invert(numInversions);
    updateChordDisplay(index);
}


/**
 * Sets a chord's quality to a random quality and updates the display
 * @param {number} index Integer index of the chord to modify
 * @param {number} minNumInversions The minimum number of times to invert the chord. Can be negative.
 * @param {number} maxNumInversions The maximum number of times to invert the chord. Can be negative.
 * @contributors Nolan
 */
export function randomizeChordInversion(index, minNumInversions, maxNumInversions) {
    invertChord(index, getRandomInt(minNumInversions, maxNumInversions));
}


/**
 * Randomly inverts all chords
 * @contributors Nolan
 */
export function randomizeAllChordInversions() {
    const minNumInversions = -2;
    const maxNumInversions = 2;
    const numChords = chordProgression.getNumChords();

    for (let i = 0; i < numChords; i++) {
        randomizeChordInversion(i, minNumInversions, maxNumInversions);
    }
}


/**
 * Toggles the current display mode between alphabetical and Roman numeral and updates all chord displays
 * @contributors Nolan, Ben
 */
export function toggleChordDisplayType() {
    isDisplayingAlphabet = !isDisplayingAlphabet;
    updateAllChordDisplays();
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
 * Hides a chord's name display
 * @param {number} index Integer index of the chord name to hide
 * @contributors Nolan
 */
export function hideChordName(index) {
    console.log(index);
    const chordNameDisplay = document.getElementById(`chordName${index}`);
    chordNameDisplay.style.display = "none";
}


/**
 * Shows a chord's name display
 * @param {number} index Integer index of the chord name to show
 * @contributors Nolan
 */
export function showChordName(index) {
    const chordNameDisplay = document.getElementById(`chordName${index}`);
    chordNameDisplay.style.display = "block";
}


/**
 * Hides all chord names
 * @contributors Nolan
 */
export function hideAllChordNames() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        hideChordName(i);
    }
}




/**
 * Shows all chord names
 * @contributors Nolan
 */
export function showAllChordNames() {
    const numChords = chordProgression.getNumChords();
    for (let i = 0; i < numChords; i++) {
        showChordName(i);
    }
}


/**
 * Called on DOM load. Attaches event listeners for hydration.
 * @contributors Ethan, Adolfo, Nolan
 */
export function init() {
    for (let i = 0; i < DEFAULT_NUM_CHORDS; i++) {
        addChord();
    }

    document.getElementById("randomizeChordRootNotesButton").addEventListener("click", randomizeAllChordRootNotes);
    document.getElementById("randomizeChordQualitiesButton").addEventListener("click", randomizeAllChordQualities);
    document.getElementById("randomizeChordInversionsButton").addEventListener("click", randomizeAllChordInversions);
    document.getElementById("toggleChordDisplayTypeButton").addEventListener("click", toggleChordDisplayType);
    document.getElementById("addChordButton").addEventListener("click", addChord);
    document.getElementById("hideChordNamesButton").addEventListener("click", hideAllChordNames);
    document.getElementById("showChordNamesButton").addEventListener("click", showAllChordNames);

    document.getElementById("setRootKeySelection").onchange = (event) => setKey(event.target.value);
    document.getElementById("setScaleSelection").onchange = (event) => setReferentialScale(event.target.value);
};