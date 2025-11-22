import Note from "./note.js"
import { ChordPlaybackStyle, ChordQuality, PitchClass } from "./enums";

const DEFAULT_OCTAVE = 4;
const OCTAVE_HALF_STEP_LENGTH = 12;

/**
 * Represents a group of notes to be played simultaneously.
 */
export default class Chord {
    #notes
    #intervals
    #playbackStyle
    #representationObserver
    #noteFactory

    /**
     * Default function that generates notes for chords.
     * @param {PitchClass} pitchClass Pitch class of the note
     * @param {number}     octave     Octave of the note
     * @returns {Note} The note object to add to the chord
     */
    static defaultNoteFactory = (pitchClass, octave) => new Note(pitchClass, octave);

    /**
     * Creates a Chord instance.
     * @param {PitchClass}                                       rootNotePitchClass Pitch class of the chord's root note.
     * @param {number}                                           rootNoteOctave     Octave of the chord's root note.
     * @param {ChordQuality}                                     quality            The chord's quality. Major by default.
     * @param {number}                                           inversion          The chord's inversion (currently unused). Root by default.
     * @param {ChordPlaybackStyle}                               playbackStyle      The chord's playback style (currently unused). Block by default.
     * @param {(pitchClass: PitchClass, octave: number) => Note} noteFactory        The function that builds the note objects. Defaults to {@link Chord.defaultNoteFactory}
     * @contributors Nolan
     */
    constructor(
        rootNotePitchClass, 
        rootNoteOctave = DEFAULT_OCTAVE,
        quality = ChordQuality.MAJOR_TRIAD,
        inversion = 0,
        playbackStyle = ChordPlaybackStyle.BLOCK,
        noteFactory = Chord.defaultNoteFactory
    ) {
        this.#playbackStyle = playbackStyle;
        this.#noteFactory = noteFactory;

        // TODO: take into account the inversion
        this.#notes = [this.#noteFactory(rootNotePitchClass, rootNoteOctave)]

        // add notes based on the quality
        const chordQualitySteps = ChordQuality.getIntervals(quality);
        this.#intervals = [...chordQualitySteps];

        let currentPitchClass = rootNotePitchClass;
        let currentOctave = rootNoteOctave;

        for (const step of chordQualitySteps) {
            currentPitchClass = (currentPitchClass + step) % OCTAVE_HALF_STEP_LENGTH;
            if (currentPitchClass >= OCTAVE_HALF_STEP_LENGTH) {
                currentOctave += Math.trunc(currentPitchClass / OCTAVE_HALF_STEP_LENGTH);
                currentPitchClass %= OCTAVE_HALF_STEP_LENGTH;
            }

            this.#notes.push(this.#noteFactory(currentPitchClass, currentOctave));
        }
    }

    /**
     * Gets the pitch class of a note
     * @param {number} index Integer index of the note
     * @returns {PitchClass} The pitch class of the note
     * @contributors Nolan
     */
    getPitchClassAt(index) {
        return this.#notes[index].getPitchClass();
    }

    /**
     * Gets the octave of a note
     * @param {number} index Integer index of the note
     * @returns {number} The note's octave.
     * @contributors Nolan
     */
    getOctaveAt(index) {
        return this.#notes[index].getOctave();
    }

    getNumNotes() {
        return this.#notes.length;
    }

    getIntervals() {
        return this.#intervals;
    }

    /**
     * Transposes the chord relative to its current position.
     * @param {number} numHalfSteps The number of half steps to transpose the chord by. Negative values tranpose down while
     *                              positive values transpose up. The chord's target pitch classes must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} 
     *                              to work.
     * @contributors Nolan
     */
    transposeBy(numHalfSteps) {
        for (const note of this.#notes) {
            note.transposeBy(numHalfSteps);
        }

        this.notifyObservers(this);
    }

    /**
     * Transposes the chord's bass note to an octave and pitch class, transposing its other notes the same interval.
     * @param {PitchClass} pitchClass The pitch class to transpose the chord's root note to. Must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} to work.
     * @param {number} octave The octave to transpose the chord's root note to. If unspecified, no changes will be made to the octave.
     * @contributors Nolan
     */
    transposeTo(pitchClass, octave = this.getOctaveAt(0)) {
        const numHalfSteps = (octave - this.getOctaveAt(0)) * OCTAVE_HALF_STEP_LENGTH + (pitchClass - this.getPitchClassAt(0));
        this.transposeBy(numHalfSteps);
    }

    /**
     * Sets the chord's quality assuming the bass note as the root.
     * @param {ChordQuality} quality The chord's new quality
     * @contributors Nolan
     */
    setQuality(quality) {
        // TODO: add a paramater that takes in the quality's root note
        // adjust current notes
        const qualitySteps = ChordQuality.getIntervals(quality);
        const numSteps = qualitySteps.length;
        const numNotes = this.#notes.length;

        let noteIndex = 1;
        let stepIndex = 0;
        let currentPitchClass = this.getPitchClassAt(0);
        let currentOctave = this.getOctaveAt(0);

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
                this.#notes.push(this.#noteFactory(currentPitchClass, currentOctave))
            }

            stepIndex++;
            noteIndex++;
        }

        // if there are notes left, remove them
        this.#notes.splice(noteIndex, numNotes - noteIndex);

        this.#intervals = [...qualitySteps];

        this.notifyObservers(this);
    }

    #invertUpOnce() {
        // transpose the bass note up an octave
        const bassNote = this.#notes[0];
        bassNote.transposeBy(OCTAVE_HALF_STEP_LENGTH);

        // move the bass note to the end of the array
        this.#notes.push(this.#notes.shift());

        // update the intervals array
        const sumIntervals = this.#intervals.reduce((acc, curr) => {
            return acc + curr;
        }, 0);

        this.#intervals.shift();
        this.#intervals.push(OCTAVE_HALF_STEP_LENGTH - sumIntervals);
    }

    #invertDownOnce() {
        // transpose the top note down an octave
        const topNote = this.#notes[this.#notes.length - 1];
        topNote.transposeBy(-1 * OCTAVE_HALF_STEP_LENGTH);

        // move the bass note to the end of the array
        this.#notes.unshift(this.#notes.pop());

        // update the intervals array
        const sumIntervals = this.#intervals.reduce((acc, curr) => {
            return acc + curr;
        }, 0);

        this.#intervals.pop();
        this.#intervals.unshift(OCTAVE_HALF_STEP_LENGTH - sumIntervals);
    }

    /**
     * Inverts the chord a number of times.
     * @param {number} numInversions The (integer) number of times to invert the chord. Positive values indicate inverting up
     *                               while negative values indicate inverting down.
     * @contributors Nolan
     */
    invert(numInversions) {
        if (numInversions === 0) return;

        if (numInversions > 0) {
            for (let i = 0; i < numInversions; i++) {
                this.#invertUpOnce();
            }
        } else {
            for (let i = 0; i < Math.abs(numInversions); i++) {
                this.#invertDownOnce();
            }
        }

        this.notifyObservers(this);
    }

    addRepresentationObserver(observer) {
        this.#representationObserver = observer;
        observer.notify(this);
    }

    removeRepresentationObserver() {
        this.#representationObserver = null;
    }

    notifyObservers() {
        this.#representationObserver.notify(this);
    }

    getRepresentation() {
        return this.#representationObserver.getRepresentation();
    }
}