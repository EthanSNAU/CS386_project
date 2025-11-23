import Note from "./note.js"
import { ChordPlaybackStyle, ChordQuality, PitchClass } from "./enums";

// documentation imports
import ChordRepresentationObserver from "./chordRepresentationObserver.js";

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

    static DEFAULT_OCTAVE = 4;
    static DEFAULT_QUALITY = ChordQuality.MAJOR_TRIAD;
    static DEFAULT_INVERSION = 0;
    static DEFAULT_PLAYBACK_STYLE = ChordPlaybackStyle.BLOCK;

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
        rootNoteOctave = Chord.DEFAULT_OCTAVE,
        quality = Chord.DEFAULT_QUALITY,
        inversion = Chord.DEFAULT_INVERSION,
        playbackStyle = ChordPlaybackStyle.BLOCK,
        noteFactory = Chord.defaultNoteFactory
    ) {
        this.#playbackStyle = playbackStyle;
        this.#noteFactory = noteFactory;
        this.#representationObserver = null;

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

        this.invert(inversion);
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

    /**
     * Gets the number of notes in the chord.
     * @returns {number} The integer number of notes in the chord
     * @contributors Nolan
     */
    getNumNotes() {
        return this.#notes.length;
    }

    /**
     * Gets the intervals between notes in the chord.
     * @returns {number[]} An array of the number of half steps between each note. The first value is the 
     *                     interval between the first and second note, the second value is the interval
     *                     between the second and third note, and so on.
     * @contributors Nolan
     */
    getIntervals() {
        return [...this.#intervals];
    }

    /**
     * Gets the chord's playback style.
     * @returns {ChordPlaybackStyle} The playback style of the chord
     * @contributors Nolan
     */
    getPlaybackStyle() {
        return this.#playbackStyle;
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

        this.notifyObservers();
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

        this.notifyObservers();
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

        this.notifyObservers();
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

        this.notifyObservers();
    }

    /**
     * Attaches a representation observer to the chord. If the chord already has an observer, it is overwritten.
     * @param {ChordRepresentationObserver} observer The observer object to attach
     * @contributors Nolan
     */
    addRepresentationObserver(observer) {
        this.#representationObserver = observer;
        observer.notify(this);
    }

    /**
     * Removes a representation observer from a chord.
     * @contributors Nolan
     */
    removeRepresentationObserver() {
        this.#representationObserver = null;
    }

    /**
     * Returns true if the chord has a representation observer
     * @returns True if the chord has a representation observer, false otherwise
     * @contributors Nolan
     */
    hasRepresentationObserver() {
        return (this.#representationObserver !== null);
    }

    /**
     * Notifies all observers attached to the chord.
     * @contributors Nolan
     */
    notifyObservers() {
        if (this.hasRepresentationObserver()) {
            this.#representationObserver.notify(this);
        }
    }

    /**
     * Gets the chord's representation information.
     * @returns {{
     *  alphabetical: {
     *      name:        string,
     *      symbol:      string
     *      accidental:  string,
     *      lowerFigure: string,
     *      upperFigure: string,
     *      bassFigure:  string
     *  },
     *  roman: {
     *      name:        string,
     *      symbol:      string
     *      accidental:  string,
     *      lowerFigure: string,
     *      upperFigure: string,
     *      bassFigure:  string
     *  }
     * }} The chord's current representation
     * @contributors Nolan
     */
    getRepresentation() {
        return this.#representationObserver.getRepresentation();
    }
}