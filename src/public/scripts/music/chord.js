import { OCTAVE_HALF_STEP_LENGTH } from "./enums/pitchClass.js";
import { ChordQuality, ALL_SUPPORTED_CHORD_QUALITIES, getChordQualityRepresentation, getChordQualitySteps } from "./enums/chordQuality.js";
import { Note } from "./note.js"
import { ChordPlaybackStyle } from "./enums/chordPlaybackStyle.js";
import { ChordInversion } from "./enums/chordInversion.js";

// documentation imports
import { PitchClass, ALL_SUPPORTED_PITCH_CLASSES } from "./enums/pitchClass.js";

const DEFAULT_OCTAVE = 4;

/**
 * Represents a group of notes to be played simultaneously.
 */
export class Chord {
    /** Re-export of {@link PitchClass} */
    static PitchClass = Note.PitchClass;

    /** Re-export of {@link ChordQuality} */
    static Quality = ChordQuality;

    /** Re-export of {@link ChordInversion} */
    static Inversion = ChordInversion;

    /** Re-export of {@link ChordPlaybackStyle} */
    static PlaybackStyle = ChordPlaybackStyle;

    /** Re-export of {@link ALL_SUPPORTED_PITCH_CLASSES} */
    static ALL_SUPPORTED_ROOT_PITCH_CLASSES = Note.ALL_SUPPORTED_PITCH_CLASSES;

    /** Re-export of {@link ALL_SUPPORTED_CHORD_QUALITIES} */
    static ALL_SUPPORTED_QUALITIES = ALL_SUPPORTED_CHORD_QUALITIES;

    #rootNoteIndex
    #notes
    #bassNote
    #quality
    #playbackStyle

    /**
     * Creates a Chord instance.
     * @param {PitchClass}         rootNotePitchClass Pitch class of the chord's root note.
     * @param {number}             rootNoteOctave     Octave of the chord's root note.
     * @param {ChordQuality}       quality            The chord's quality. Major by default.
     * @param {ChordInversion}     inversion          The chord's inversion (currently unused). Root by default.
     * @param {ChordPlaybackStyle} playbackStyle      The chord's playback style (currently unused). Block by default.
     * @contributors Nolan
     */
    constructor(rootNotePitchClass, rootNoteOctave = DEFAULT_OCTAVE, quality = Chord.Quality.MAJOR, inversion = Chord.Inversion.ROOT,
                playbackStyle = Chord.PlaybackStyle.BLOCK) {

        this.#bassNote = null;
        this.#playbackStyle = playbackStyle;
        this.#quality = quality;

        // TODO: take into account the inversion
        this.#rootNoteIndex = 0;
        this.#notes = [new Note(rootNotePitchClass, rootNoteOctave)]

        // add notes based on the quality
        const chordQualitySteps = getChordQualitySteps(quality);
        let currentPitchClass = rootNotePitchClass;
        let currentOctave = rootNoteOctave;

        for (const step of chordQualitySteps) {
            currentPitchClass = (currentPitchClass + step) % OCTAVE_HALF_STEP_LENGTH;
            currentPitchClass += step;
            if (currentPitchClass >= OCTAVE_HALF_STEP_LENGTH) {
                currentOctave += Math.trunc(currentPitchClass / OCTAVE_HALF_STEP_LENGTH);
                currentPitchClass %= OCTAVE_HALF_STEP_LENGTH;
            }

            this.#notes.push(new Note(currentPitchClass, currentOctave));
        }
    }

    #getRootNote() {
        return this.#notes[this.#rootNoteIndex];
    }

    /**
     * Gets the root note's pitch class.
     * @returns {PitchClass} The root note's pitch class
     * @contributors Nolan
     */
    getRootPitchClass() {
        return this.#getRootNote().getPitchClass();
    }

    /**
     * Gets the root note's octave.
     * @returns {number} The root note's octave.
     * @contributors Nolan
     */
    getRootOctave() {
        return this.#getRootNote().getOctave();
    }

    /**
     * Gets the chord's quality.
     * @returns {ChordQuality} The chord's quality.
     * @contributors Nolan
     */
    getQuality() {
        return this.#quality;
    }

    /**
     * Gets the chord's representation information according to its quality
     * @returns The chord quality's representation information
     * @contributors Nolan
     */
    getQualityRepresentation() {
        return getChordQualityRepresentation(this.#quality);
    }

    /**
     * Transposes the chord relative to its current state.
     * @param {number} numHalfSteps The number of half steps to transpose the chord by. Negative values tranpose down while
     *                              positive values transpose up. The chord's target pitch classes must be in {@link ALL_SUPPORTED_PITCH_CLASSES} 
     *                              to work.
     * @contributors Nolan
     */
    transposeBy(numHalfSteps) {
        for (const note of this.#notes) {
            note.transposeBy(numHalfSteps);
        }
    }

    /**
     * Transposes the chord to an octave and pitch class.
     * @param {PitchClass} pitchClass The pitch class to transpose the chord's root note to. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
     * @param {number} octave The octave to transpose the chord's root note to. If unspecified, no changes will be made to the octave.
     * @contributors Nolan
     */
    transposeTo(pitchClass, octave = this.getRootOctave()) {
        const numHalfSteps = (octave - this.getRootOctave()) * OCTAVE_HALF_STEP_LENGTH + (pitchClass - this.getRootPitchClass());
        this.transposeBy(numHalfSteps);
    }

    /**
     * Sets the chord's quality, modifying its notes to match.
     * @param {ChordQuality} quality The chord's new quality
     * @contributors Nolan
     */
    setQuality(quality) {
        this.#quality = quality;
        
        // adjust current notes
        const qualitySteps = getChordQualitySteps(this.#quality);
        const numSteps = qualitySteps.length;
        const numNotes = this.#notes.length;

        let noteIndex = 1;
        let stepIndex = 0;
        let currentPitchClass = this.getRootPitchClass();
        let currentOctave = this.getRootOctave();

        while (stepIndex < numSteps) {
            const note = this.#notes[noteIndex];
            const step = qualitySteps[stepIndex];

            currentPitchClass += step;
            if (currentPitchClass >= OCTAVE_HALF_STEP_LENGTH) {
                currentOctave += Math.trunc(currentPitchClass / OCTAVE_HALF_STEP_LENGTH);
                currentPitchClass %= OCTAVE_HALF_STEP_LENGTH;
            }

            if (note) {
                note.transposeTo(currentPitchClass, currentOctave);
            } else {
                this.#notes.push(new Note(currentPitchClass, currentOctave))
            }

            stepIndex++;
            noteIndex++;
        }

        // if there are notes left, remove them
        this.#notes.splice(noteIndex, numNotes - noteIndex);
    }

    /**
     * Sets the bass note of the chord. If a bass note already exists, it is transposed to the inputted parameters.
     * @param {PitchClass} pitchClass Pitch class of the bass note. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
     *                                If it is equal to the root note's pitch class, then the bass note is removed.
     * @param {number}     octave     Octave of the bass note. Defaults to one octave below the chord's root note.
     * @contributors Nolan
     */
    setBassNote(pitchClass, octave = this.getRootOctave() - 1) {
        if (this.getRootPitchClass() === pitchClass) {
            this.removeBassNote();
            return;
        }

        if (this.#bassNote) {
            this.#bassNote.transposeTo(pitchClass, octave);
        } else {
            this.#bassNote = new Note(pitchClass, octave);
        }
    }

    /**
     * Removes the bass note from the chord, destroying the {@link Note} object.
     * @contributors Nolan
     */
    removeBassNote() {
        this.#bassNote = null;
    }

    /**
     * Gets the chord's bass note's pitch class.
     * @returns {PitchClass} The bass note's pitch class, if it exists. If it doesn't, then {@link PitchClass.NONE} is returned
     * @contrubutors Nolan
     */
    getBassNotePitchClass() {
        if (this.#bassNote) {
            return this.#bassNote.getPitchClass();
        } else {
            return Chord.PitchClass.NONE;
        }
    }

    /**
     * Returns true if the chord has a bass note.
     * @returns {boolean} True if the chord has a bass note, false otherwise
     * @contributors Nolan
     */
    hasBassNote() {
        return (this.#bassNote !== null);
    }
}