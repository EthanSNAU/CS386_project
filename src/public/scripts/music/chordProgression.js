import { Chord } from "./chord.js";
import { Scale } from "./scale.js";

const DEFAULT_OCTAVE = 4;

export class ChordProgression {
    static PitchClass = Chord.RootPitchClass;
    static ChordQuality = Chord.Quality;
    static ChordInversion = Chord.Inversion;
    static ChordPlaybackStyle = Chord.PlaybackStyle;

    static ReferentialScale = Scale.ReferentialScale;
    static PitchClassRepresentationType = Scale.PitchClassRepresentationType;

    static ALL_SUPPORTED_PITCH_CLASSES = Chord.ALL_SUPPORTED_ROOT_PITCH_CLASSES;
    static ALL_SUPPORTED_CHORD_QUALITIES = Chord.ALL_SUPPORTED_QUALITIES;

    #chords
    #scale
    
    constructor(scaleRootPitchClass, referentialScale) {
        this.#scale = new Scale(scaleRootPitchClass, referentialScale);
        this.#chords = [];
    }

    /**
     * Gets a chord's representation information
     * @param {Number} chordIndex Index of the chord to get information on
     * @returns {{
     *  alphabeticalName:   string,
     *  alphabeticalSymbol: string,
     *  alphabeticalType:   PITCH_CLASS_REPRESENTATION_TYPE
     *  romanName:          string,
     *  romanSymbol:        string,
     *  romanType:          PITCH_CLASS_REPRESENTATION_TYPE
     * }}
     * @contributors Marcus, Nolan
     */
    getChordRepresentation(chordIndex) {
        // TODO: precompute all chord representations and store them in an array instead of running this every time
        const chord = this.#chords[chordIndex];
        const chordPitchClass = chord.getRootPitchClass();
        const qualityRepresentation = chord.getQualityRepresentation();

        const chordRepresentation = this.#scale.getRepresentationFor(chordPitchClass);

        // account for minor and diminished chords
        if (qualityRepresentation.isLowercase) {
            chordRepresentation.romanSymbol = chordRepresentation.romanSymbol.toLowerCase();
        }

        // quality name + symbols
        if (qualityRepresentation.name) {
            chordRepresentation.alphabeticalName += " " + qualityRepresentation.name;
            chordRepresentation.romanName += " " + qualityRepresentation.name;
        }

        if (qualityRepresentation.symbol) {
            chordRepresentation.alphabeticalSymbol += " " + qualityRepresentation.symbol;
            chordRepresentation.romanSymbol += " " + qualityRepresentation.symbol;
        }

        return chordRepresentation;
    }

    getNumChords() {
        return this.#chords.length;
    }

    transposeChord(chordIndex, numHalfSteps) {
        this.#chords[chordIndex].transposeBy(numHalfSteps);
    }

    setChordRootNote(chordIndex, pitchClass, octave = DEFAULT_OCTAVE) {
        const chord = this.#chords[chordIndex];
        chord.transposeTo(pitchClass, octave);
    }

    setChordQuality(chordIndex, quality) {
        const chord = this.#chords[chordIndex];
        chord.setQuality(quality);
    }

    addChord(pitchClass = this.#scale.getRootPitchClass(), octave = DEFAULT_OCTAVE, quality = ChordProgression.ChordQuality.MAJOR) {
        this.#chords.push(new Chord(pitchClass, octave, quality));
    }

    // addChord(chord) {
    //     this.#chords.push(chord);
    // }

    removeChord(chordIndex) {
        this.#chords.splice(chordIndex, 1);
    }

    clearChords() {
        this.#chords = [];
    }

    popChord() {
        return this.#chords.pop();
    }
}

// module.exports = {
//     ChordProgression
// };