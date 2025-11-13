const { CHORD_QUALITY } = require("./chord.js");
const { Scale } = require ("./scale.js");
const { Chord } = require ("./chord.js");


function isLowercaseQuality(quality) {
    const LOWERCASE_QUALITIES = [CHORD_QUALITY.MINOR, CHORD_QUALITY.DIMINISHED, CHORD_QUALITY.HALF_DIMINISHED];
    return LOWERCASE_QUALITIES.includes(quality);
}

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
        const chord = this.#chords[chordIndex];
        const chordPitchClass = chord.getRootNote().getPitchClass();
        const qualityInformation = chord.getQualityInformation();

        const chordRepresentation = this.#scale.getRepresentationFor(chordPitchClass);

        // account for minor and diminished chords
        if (isLowercaseQuality(qualityInformation.quality)) {
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

    transposeChordBy(chordIndex, numHalfSteps) {
        this.#chords[chordIndex].transposeBy(numHalfSteps);
    }

    transposeChordTo(chordIndex, pitchClass, octave) {
        this.#chords[chordIndex].transposeTo(pitchClass, octave);
    }

    addChord(pitchClass, octave, chordQuality) {
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