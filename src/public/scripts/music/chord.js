const { OCTAVE_HALF_STEP_LENGTH } = require("./pitchClass.js");

const CHORD_PLAYBACK_STYLE = Object.freeze({
    BLOCK:         0,
    ARPEGGIO_UP:   1,
    ARPEGGIO_DOWN: 2,
    BROKEN:        3
});

const CHORD_INVERSION = Object.freeze({
    ROOT:   0,
    FIRST:  1,
    SECOND: 2
});

const CHORD_QUALITY = Object.freeze({
    MAJOR:           0,
    MINOR:           1,
    DIMINISHED:      2,
    AUGMENTED:       3,
    SUSPENDED_TWO:   4,
    SUSPENDED_FOUR:  5,
    DOMINANT_SEVEN:  6,
    HALF_DIMINISHED: 7
});

// "steps" are in half steps
const ChordQualityMap = Object.freeze({
    [CHORD_QUALITY.MAJOR]:           { steps: [4, 3],    symbol: "",     name: "major",           isLowercase: false },
    [CHORD_QUALITY.MINOR]:           { steps: [3, 4],    symbol: "m",    name: "minor",           isLowercase: true  },
    [CHORD_QUALITY.DIMINISHED]:      { steps: [3, 3],    symbol: "dim",  name: "diminished",      isLowercase: true  },
    [CHORD_QUALITY.AUGMENTED]:       { steps: [4, 4],    symbol: "aug",  name: "augmented",       isLowercase: false },
    [CHORD_QUALITY.SUSPENDED_TWO]:   { steps: [2, 5],    symbol: "sus2", name: "suspended two",   isLowercase: false },
    [CHORD_QUALITY.SUSPENDED_FOUR]:  { steps: [5, 2],    symbol: "sus4", name: "suspended four",  isLowercase: false },
    [CHORD_QUALITY.DOMINANT_SEVEN]:  { steps: [4, 3, 3], symbol: "7",    name: "dominant seven",  isLowercase: false },
    [CHORD_QUALITY.HALF_DIMINISHED]: { steps: [3, 3, 4], symbol: "m7b5", name: "half diminished", isLowercase: true  },
})

const DEFAULT_OCTAVE = 4;

class Chord {
    #rootNoteIndex
    #notes
    #quality
    #playbackStyle

    constructor(rootNotePitchClass, rootNoteOctave = DEFAULT_OCTAVE, quality, inversion = CHORD_INVERSION.ROOT,
                playbackStyle = CHORD_PLAYBACK_STYLE.BLOCK) {

        this.#playbackStyle = playbackStyle;
        this.#quality = quality;

        // TODO: take into account the inversion
        this.#rootNoteIndex = 0;
        this.#notes = [new Note(rootNotePitchClass, rootNoteOctave)]

        // add notes based on the quality
        const chordQualitySteps = ChordQualityMap[quality].steps;
        let currentPitchClass = rootNotePitchClass;
        let currentOctave = rootNoteOctave;

        for (const step of chordQualitySteps) {
            currentPitchClass = (currentPitchClass + step) % OCTAVE_HALF_STEP_LENGTH;
            currentPitchClass += step;
            if (currentPitchClass >= OCTAVE_HALF_STEP_LENGTH) {
                currentOctave += Math.trunc(currentPitchClass / OCTAVE_HALF_STEP_LENGTH);
                currentPitch %= OCTAVE_HALF_STEP_LENGTH;
            }

            this.#notes.push(new Note(currentPitchClass, currentOctave));
        }
    }

    getRootNote() {
        return this.#notes[this.#rootNoteIndex];
    }

    getQualityInformation() {
        const qualityInfo = ChordQualityMap[this.#quality];
        return {
            quality:     this.#quality,
            symbol:      qualityInfo.symbol,
            name:        qualityInfo.name,
            isLowercase: qualityInfo.isLowercase
        };
    }

    transposeBy(numHalfSteps) {
        for (const note of this.#notes) {
            note.transposeBy(numHalfSteps);
        }
    }

    transposeTo(pitchClass, octave) {
        const rootNote = this.getRootNote();
        const numHalfSteps = (octave - rootNote.getOctave()) * OCTAVE_HALF_STEP_LENGTH + (pitchClass - rootNote.pitchClass);
        this.transposeBy(numHalfSteps);
    }
}

this.modules = {
    Chord,
    CHORD_PLAYBACK_STYLE,
    CHORD_INVERSION,
    CHORD_QUALITY,
};