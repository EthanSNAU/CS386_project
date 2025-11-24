import Chord from "./chord.js";
import Scale from "./scale.js";

const DEFAULT_OCTAVE = 4;

/**
 * Represents a set of chords to be played in sequence.
 */
export default class ChordProgression {
    #chords
    #chordRepresentations
    #scale
    
    /**
     * Creates a ChordProgression instance.
     * @param {Scale} scale {@link Scale} for the chord progression to be in
     * @contributors Nolan
     */
    constructor(scale) {
        this.#scale = scale
        this.#chords = [];
        this.#chordRepresentations = [];
    }


    /**
     * Gets the progression's current length.
     * @returns The current number of chords in the progression
     * @contributors Nolan
     */
    getNumChords() {
        return this.#chords.length;
    }

    /**
     * Gets a {@link Chord} from the progression
     * @param {number} index Integer index of the chord to get
     * @returns {Chord} The chord located at the inputted index
     */
    getChord(index) {
        return this.#chords[index];
    }

    getScale() {
        return this.#scale;
    }

    /**
     * Adds a new chord to the progression.
     * @param {number} chordIndex The new chord's location in the chord progression
     * @param {Chord}  chord      The chord to add
     * @contributors Nolan
     */
    addChord(chordIndex, chord) {
        this.#chords.splice(chordIndex, 0, chord);
        this.#chordRepresentations.splice(chordIndex, 0, {representations: [], index: 0});
    }

    /**
     * Removes a chord from the progression.
     * @param {number} chordIndex Integer index of the chord to remove
     * @returns {Chord} The removed chord
     * @contributors Nolan
     */
    removeChord(chordIndex) {
        this.#chordRepresentations.splice(chordIndex, 1);
        return this.#chords.splice(chordIndex, 1)[0];
    }

    /**
     * Removes all chords from the progression.
     * @contributors Nolan
     */
    clearChords() {
        this.#chords = [];
        this.#chordRepresentations = [];
    }

    /**
     * Removes the last chord from the progression.
     * @returns {Chord} The removed chord
     * @contributors Nolan
     */
    popChord() {
        this.#chordRepresentations.pop();
        return this.#chords.pop();
    }
}