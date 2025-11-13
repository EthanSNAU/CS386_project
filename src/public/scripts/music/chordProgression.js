const { CHORD_QUALITY, Chord } = require("./chord.js");
const { Scale } = require ("./scale.js");

const DEFAULT_OCTAVE = 4;

class ChordProgression {
    #chords
    #scale
    
    constructor(scaleRootPitchClass, referentialScale) {
        this.#scale = new Scale(scaleRootPitchClass, referentialScale);
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
        const chordPitchClass = chord.getRootNote().getPitchClass();
        const qualityInformation = chord.getQualityInformation();

        const chordRepresentation = this.#scale.getRepresentationFor(chordPitchClass);

        // account for minor and diminished chords
        if (qualityInformation.isLowercase) {
            chordRepresentation.alphabeticalSymbol = chordRepresentation.alphabeticalSymbol.toLower();
            chordRepresentation.romanSymbol = chordRepresentation.romanSymbol.toLower();
        }

        // quality name + symbols
        if (qualityInformation.name) {
            chordRepresentation.alphabeticalName += " " + qualityInformation.name;
            chordRepresentation.romanName += " " + qualityInformation.name;
        }

        chordRepresentation.alphabeticalSymbol += " " + qualityInformation.symbol;
        chordRepresentation.romanSymbol += " " + qualityInformation.symbol;

        return chordRepresentation;
    }

    getNumChords() {
        return this.#chords.length;
    }

    transposeChord(chordIndex, numHalfSteps) {
        this.#chords[chordIndex].transposeBy(numHalfSteps);
    }

    setChord(chordIndex, pitchClass, octave) {
        this.#chords[chordIndex].transposeTo(pitchClass, octave);
    }

    addChord(pitchClass = this.#scale.getRootPitchClass(), octave = DEFAULT_OCTAVE, chordQuality = CHORD_QUALITY.MAJOR) {
        this.#chords.push(new Chord(pitchClass, octave, chordQuality))
    }

    addChord(chord) {
        this.#chords.push(chord);
    }

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

module.exports = {
    ChordProgression
};