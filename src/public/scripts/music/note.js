import { PitchClass } from "./enums";

const OCTAVE_HALF_STEP_LENGTH = 12;

/**
 * Manages the octave, pitch, and length of a pitch class.
 */
export default class Note {
    #pitchClass
    #pitch
    #octave
    #length // unused for now

    static DEFAULT_OCTAVE = 4;

    /**
     * Creates a Note instance.
     * @param {PitchClass} pitchClass Pitch class for the note to play
     * @param {number} octave Octave for the note to play in
     * @contributors Nolan
     */
    constructor(pitchClass, octave = Note.DEFAULT_OCTAVE) {
        this.#pitchClass = pitchClass;
        this.#octave = octave;
        this.#pitch = PitchClass.getPitch(pitchClass, octave);
    }

    /**
     * Gets the note's pitch class.
     * @returns {PitchClass} The note's pitch class
     * @contributors Nolan
     */
    getPitchClass() {
        return this.#pitchClass;
    }

    /**
     * Gets the note's octave.
     * @returns {number} The note's current octave
     * @contributors Nolan
     */
    getOctave() {
        return this.#octave;
    }

    /**
     * Gets the note's pitch/frequency.
     * @returns The note's pitch in Hz.
     */
    getPitch() {
        return this.#pitch;
    }

    /**
     * Transposes the note relative to its current position.
     * @param {number} numHalfSteps The number of half steps to transpose the note by. Negative values tranpose down while
     *                              positive values transpose up. The target pitch class must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} 
     *                              to work.
     * @contributors Nolan
     */
    transposeBy(numHalfSteps) {
        let newPitchClass = this.#pitchClass + numHalfSteps;
        let octaveDiff = 0;

        // TODO: make this more efficient (i'm too lazy to do math)
        if (newPitchClass < 0) {
            while (newPitchClass < 0) { // technically redundant but it makes the code more readable imo
                newPitchClass += OCTAVE_HALF_STEP_LENGTH;
                octaveDiff--;
            }
        } else if (newPitchClass > OCTAVE_HALF_STEP_LENGTH) {
            while (newPitchClass > OCTAVE_HALF_STEP_LENGTH) {
                newPitchClass -= OCTAVE_HALF_STEP_LENGTH;
                octaveDiff++;
            }
        }

        this.transposeTo(newPitchClass, this.#octave + octaveDiff);
    }

    /**
     * Transposes the note to an octave and pitch class.
     * @param {PitchClass} pitchClass The pitch class to transpose the note to. Must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} to work.
     * @param {number} octave The octave to transpose the note to. If unspecified, no changes will be made to the octave.
     * @contributors Nolan
     */
    transposeTo(pitchClass, octave = this.#octave) {
        this.#pitchClass = pitchClass;
        this.#octave = octave;
        this.#pitch = PitchClass.getPitch(pitchClass, octave);
    }
}