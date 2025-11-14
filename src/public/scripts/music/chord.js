import { OCTAVE_HALF_STEP_LENGTH } from "./enums/pitchClass.js";
import { ChordQuality, ALL_SUPPORTED_CHORD_QUALITIES, getChordQualityRepresentation, getChordQualitySteps } from "./enums/chordQuality.js";
import { Note } from "./note.js"

export const ChordPlaybackStyle = Object.freeze({
    BLOCK:         0,
    ARPEGGIO_UP:   1,
    ARPEGGIO_DOWN: 2,
    BROKEN:        3
});

export const ChordInversion = Object.freeze({
    ROOT:   0,
    FIRST:  1,
    SECOND: 2
});

const DEFAULT_OCTAVE = 4;

export class Chord {
    static RootPitchClass = Note.PitchClass;
    static Quality = ChordQuality;
    static Inversion = ChordInversion;
    static PlaybackStyle = ChordPlaybackStyle;

    static ALL_SUPPORTED_ROOT_PITCH_CLASSES = Note.ALL_SUPPORTED_PITCH_CLASSES;
    static ALL_SUPPORTED_QUALITIES = ALL_SUPPORTED_CHORD_QUALITIES;

    #rootNoteIndex
    #notes
    #quality
    #playbackStyle

    constructor(rootNotePitchClass, rootNoteOctave = DEFAULT_OCTAVE, quality = Chord.Quality.MAJOR, inversion = Chord.Inversion.ROOT,
                playbackStyle = Chord.PlaybackStyle.BLOCK) {

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

    getRootPitchClass() {
        return this.#getRootNote().getPitchClass();
    }

    getRootOctave() {
        return this.#getRootNote().getOctave();
    }

    getQualityRepresentation() {
        return getChordQualityRepresentation(this.#quality);
    }

    transposeBy(numHalfSteps) {
        for (const note of this.#notes) {
            note.transposeBy(numHalfSteps);
        }
    }

    transposeTo(pitchClass, octave) {
        const numHalfSteps = (octave - this.getRootOctave()) * OCTAVE_HALF_STEP_LENGTH + (pitchClass - this.getRootPitchClass());
        this.transposeBy(numHalfSteps);
    }

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
}

// this.modules = {
//     Chord,
//     CHORD_PLAYBACK_STYLE,
//     CHORD_INVERSION,
//     CHORD_QUALITY,
// };