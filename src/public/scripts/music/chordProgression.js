import { Chord } from "./chord.js";
import { Scale } from "./scale.js";
import { ChordQuality, ChordQualityType } from "./enums";
import { convertToOrdinalWord } from "./numberConversion.js";

// documentation imports
import { Accidental, PitchClass, ReferentialScale } from "./enums";

const DEFAULT_OCTAVE = 4;

/**
 * Represents a set of chords to be played in sequence. Manages chord representations.
 */
export class ChordProgression {
    #chords
    #chordRepresentations
    #scale
    
    /**
     * Creates a ChordProgression instance.
     * @param {PitchClass}       scaleRootPitchClass Pitch class of the referential scale's root note
     * @param {ReferentialScale} referentialScale    Referential scale type
     * @contributors Nolan
     */
    constructor(scaleRootPitchClass, referentialScale) {
        this.#scale = new Scale(scaleRootPitchClass, referentialScale);
        this.#chords = [];
        this.#chordRepresentations = [];
    }

    #updateChordRepresentation(chordIndex) {
        const chord = this.#chords[chordIndex];
        const representationInfo = this.#chordRepresentations[chordIndex];
        const possibleQualityInversions = chord.getPossibleQualities();

        representationInfo.representations = possibleQualityInversions.map(qualityInversion => {
            // get basic info
            const qualityRepresentation = ChordQuality.getRepresentation(qualityInversion.quality);
            const rootNoteRepresentation = this.#scale.getRepresentation(qualityInversion.rootPitchClass);

            if (qualityRepresentation.name) {
                rootNoteRepresentation.alphabetical.name += " " + qualityRepresentation.name;
                rootNoteRepresentation.roman.name += " " + qualityRepresentation.name;
            }

            // take care of roman symbol
            let romanSymbol = rootNoteRepresentation.roman.symbol;

            if (qualityRepresentation.isLowercase) {
                romanSymbol = romanSymbol.toLowerCase();

                if (ChordQuality.hasMinorSymbol(qualityInversion.quality)) {
                    romanSymbol = qualityRepresentation.symbolDescriptors.prefix + romanSymbol;
                } else {
                    romanSymbol = qualityRepresentation.symbolDescriptors.prefix + romanSymbol + qualityRepresentation.symbolDescriptors.suffix;
                }
            } else {
                romanSymbol = qualityRepresentation.symbolDescriptors.prefix + romanSymbol + qualityRepresentation.symbolDescriptors.suffix;
            }

            // account for inversion
            const inversionDescriptors = ChordQualityType.getInversionDescriptors(ChordQuality.getType(qualityInversion.quality), qualityInversion.inversion);

            // alphabetical inversion
            let alphabeticalBassFigure = "";
            let alphabeticalName = rootNoteRepresentation.alphabetical.name;

            const bassNoteRepresentation = this.#scale.getRepresentation(qualityInversion.bassPitchClass);

            if (qualityInversion.inversion !== 0) {
                alphabeticalBassFigure = "/" + bassNoteRepresentation.alphabetical.symbol;
                alphabeticalName += " over " + bassNoteRepresentation.alphabetical.name;
            }

            // roman inversion. If no descriptors are specified, then the bass figure is borrowed from the alphabet
            let romanBassFigure;
            let romanName = rootNoteRepresentation.roman.name;
            if (inversionDescriptors === null) {
                romanBassFigure = alphabeticalBassFigure;
                romanName += " over " + bassNoteRepresentation.alphabetical.name;
            } else {
                romanBassFigure = inversionDescriptors.upper;
                if (inversionDescriptors.lower) {
                    romanBassFigure += "/" + inversionDescriptors.lower;
                }

                if (qualityInversion.inversion !== 0) {
                    romanName += " in the " + convertToOrdinalWord(qualityInversion.inversion) + " inversion";
                }
            }
            
            // create the object
            // TODO: add another attribute that tracks the current root note (not bass note) so that
            //       switching between chord qualities can be done relative to the root
            const newRepresentation = {
                alphabetical: {
                    name:        alphabeticalName,
                    symbol:      qualityRepresentation.symbolDescriptors.prefix + rootNoteRepresentation.alphabetical.symbol + qualityRepresentation.symbolDescriptors.suffix,
                    accidental:  rootNoteRepresentation.alphabetical.accidental,
                    lowerFigure: qualityRepresentation.symbolDescriptors.lower,
                    upperFigure: qualityRepresentation.symbolDescriptors.upper,
                    bassFigure:  alphabeticalBassFigure
                },
                roman: {
                    name:        romanName,
                    symbol:      romanSymbol,
                    accidental:  rootNoteRepresentation.roman.accidental,
                    lowerFigure: qualityRepresentation.symbolDescriptors.lower,
                    upperFigure: qualityRepresentation.symbolDescriptors.upper,
                    bassFigure:  romanBassFigure
                },
            };

            return newRepresentation;
        });
    }

    /**
     * Gets a chord's representation information.
     * @param {number} chordIndex Integer index of the chord to get information on
     * @returns {{
     *  alphabetical: {
     *      name:        string,
     *      symbol:      string,
     *      accidental:  Accidental,
     *      lowerFigure: string,
     *      upperFigure: string,
     *      bassFigure:  string
     *  },
     *  roman: {
     *      name:        string,
     *      symbol:      string,
     *      accidental:  Accidental,
     *      lowerFigure: string,
     *      upperFigure: string
     *      bassFigure:  string
     *  },
     * }} The chord's representation information
     * @contributors Marcus, Nolan
     */
    getChordRepresentation(chordIndex) {
        const info = this.#chordRepresentations[chordIndex];

        return info.representations[info.index];
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
     * Transposes a chord relative to its current position.
     * @param {number} chordIndex   Integer index of the chord to transpose
     * @param {number} numHalfSteps Number of half steps to transpose the chord by. Negative values tranpose down while
     *                              positive values transpose up. The chord's target pitch classes must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} 
     *                              to work.
     */
    transposeChord(chordIndex, numHalfSteps) {
        this.#chords[chordIndex].transposeBy(numHalfSteps);

        this.#updateChordRepresentation(chordIndex);
    }

    /**
     * Transposes a chord's bass note to a pitch class and octave, modifying its other notes to match.
     * @param {number}     chordIndex Integer index of the chord to transpose
     * @param {PitchClass} pitchClass The pitch class to transpose the note to. Must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} to work.
     * @param {number}     octave     The octave to transpose the note to. If unspecified, no changes will be made to the octave.
     * @contributors Nolan
     */
    setChordRootNote(chordIndex, pitchClass, octave = DEFAULT_OCTAVE) {
        const chord = this.#chords[chordIndex];
        chord.transposeTo(pitchClass, octave);

        this.#updateChordRepresentation(chordIndex);
    }

    /**
     * Sets a chord's quality, modifying its notes to match.
     * @param {number}       chordIndex Integer index of the chord to modify
     * @param {ChordQuality} quality    The chord's new quality. Must be in {@link ChordQuality.SUPPORTED_QUALITIES} to work.
     * @contributors Nolan
     */
    setChordQuality(chordIndex, quality) {
        const chord = this.#chords[chordIndex];
        chord.setQuality(quality);

        this.#updateChordRepresentation(chordIndex);
    }

    /**
     * Inverts a chord some number of times.
     * @param {number} chordIndex    Integer index of the chord to modify
     * @param {number} numInversions The (integer) number of times to invert the chord. Positive values indicate inverting up
     *                               while negative values indicate inverting down.
     * @contributors Nolan
     */
    invertChord(chordIndex, numInversions) {
        const chord = this.#chords[chordIndex];
        chord.invert(numInversions);

        this.#updateChordRepresentation(chordIndex);
    }

    /**
     * Adds a new chord to the progression.
     * @param {PitchClass}   pitchClass The new chord's pitch class. Defaults to the scale's root note.
     * @param {number}       octave     The new chord's octave. Defaults to {@link DEFAULT_OCTAVE}.
     * @param {ChordQuality} quality    The new chord's quality. Defaults to major.
     * @contributors Nolan
     */
    addChord(chordIndex, pitchClass = this.#scale.getRootPitchClass(), octave = DEFAULT_OCTAVE, quality = ChordQuality.MAJOR_TRIAD) {
        this.#chords.splice(chordIndex, 0, new Chord(pitchClass, octave, quality));

        this.#chordRepresentations.splice(chordIndex, 0, {representations: [], index: 0});
        this.#updateChordRepresentation(chordIndex);
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