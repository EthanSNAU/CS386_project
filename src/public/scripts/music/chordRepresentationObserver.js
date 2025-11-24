import { ChordQuality, ChordQualityType } from "./enums"
import { convertToOrdinalWord } from "./numberConversion.js";

// documentation imports
import Chord from "./chord.js";
import Scale from "./scale.js";

const OCTAVE_HALF_STEP_LENGTH = 12;
const NO_INVERSION = -1;

/**
 * Gets the inversion a chord would be in if it took on a certain quality.
 * @param {Chord}        chord   The chord to test
 * @param {ChordQuality} quality The chord quality to test
 * @returns {number} The inversion the chord would be in. If no inversion is found, {@link NO_INVERSION} is returned.
 * @contributors Nolan
 */
function getChordInversionInQuality(chord, quality) {
    const chordIntervals = chord.getIntervals();
    const rootInversionIntervals = ChordQuality.getIntervals(quality);

    const numBaseIntervals = rootInversionIntervals.length;
    const numIntervals = chordIntervals.length;
    if (numBaseIntervals !== numIntervals) return NO_INVERSION;

    // check if chordIntervals is an inversion of rootInversionIntervals

    const sumRootInversionIntervals = rootInversionIntervals.reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    const allAllowedIntervals = [...rootInversionIntervals, OCTAVE_HALF_STEP_LENGTH - (sumRootInversionIntervals % OCTAVE_HALF_STEP_LENGTH)];
    const numPossibleInversions = allAllowedIntervals.length;

    // Try to find a case where removing one element from allAllowedIntervals produces an array that matches chordInvervals
    // [a, b, c, d, e, f] => removing c produces [d, e, f, a, b]

    // TODO: make this part more efficient

    const getReducedArray = (arr, index) => {
        let reduced = [];
        let removedIndex = index;
        index++;

        // go until end of array
        while (index < arr.length) {
            reduced.push(arr[index]);
            index++;
        }

        // loop back and continue until all elements have been covered
        index = 0;
        while (index < removedIndex) {
            reduced.push(arr[index]);
            index++;
        }

        return reduced;
    }

    // i points to the element being excluded
    for (let i = numPossibleInversions - 1; i >= 0; i--) {
        const possibleInversion = getReducedArray(allAllowedIntervals, i);

        // check if match, and if so, find and return the inversion number
        if (possibleInversion.every((element, index) => (element === chordIntervals[index]))) {
            if (i === numPossibleInversions - 1) return 0;
            return i + 1;
        }
    }

    return NO_INVERSION;
}

// TODO: add ability for users to toggle between different representations (eg. Csus2 vs. Gsus4)

/**
 * Gets a list of qualities/inversions (and associated attributes) that fit a chord.
 * @param {Chord} chord The chord to get quality inversions for
 * @returns {{
 *  quality:        string
 *  inversion:      number
 *  rootPitchClass: PitchClass
 *  bassPitchClass: PitchClass
 * }} The chord's possible qualities/inversions
 * @contributors Nolan
 */
function getPossibleQualityInversions(chord) {
    const numNotes = chord.getNumNotes();
    let possibleQualities = [];

    // iterate through all chord qualities. If any of them match, add them to the array.
    for (const quality of ChordQuality.SUPPORTED_QUALITIES) {
        const inversion = getChordInversionInQuality(chord, quality);

        if (inversion === NO_INVERSION) continue;

        if (inversion >= numNotes || inversion < 0) {
            console.error("[getPossibleQualities] Error: Received erroneous inversion.");
            return [];
        }

        let rootPitchClass;
        if (inversion === 0) {
            rootPitchClass = chord.getPitchClassAt(0);
        } else {
            rootPitchClass = chord.getPitchClassAt(numNotes - inversion);
        }

        possibleQualities.push({
            quality:        quality,
            inversion:      inversion,
            rootPitchClass: rootPitchClass,
            bassPitchClass: chord.getPitchClassAt(0)
        });
    }

    return possibleQualities;
}

/**
 * Observes the {@link Chord} class by keeping track of a chord's symbols and names.
 */
export default class ChordRepresentationObserver {
    #representations
    #representationIndex
    #scale

    /**
     * Creates a {@link ChordRepresentationObserver} instance.
     * @param {Scale} scale The scale with which to fetch pitch class representations.
     * @contributors Nolan
     */
    constructor(scale) {
        this.#representations = [];
        this.#representationIndex = 0;
        this.#scale = scale;
    }

    /**
     * Updates stored representations based on the inputted chord.
     * @param {Chord} chord The chord to update the representations for
     * @contributors Nolan
     */
    notify(chord) {
        const possibleQualityInversions = getPossibleQualityInversions(chord);
        const scale = this.#scale;

        this.#representations = possibleQualityInversions.map(qualityInversion => {
            // get basic info
            const qualityRepresentation = ChordQuality.getRepresentation(qualityInversion.quality);
            const rootNoteRepresentation = scale.getRepresentation(qualityInversion.rootPitchClass);

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

            const bassNoteRepresentation = scale.getRepresentation(qualityInversion.bassPitchClass);

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
     * Gets the observed chord's current representation.
     * @returns {{
     *  alphabetical: {
     *      name:        string,
     *      symbol:      string
     *      accidental:  Accidental,
     *      lowerFigure: string,
     *      upperFigure: string,
     *      bassFigure:  string
     *  },
     *  roman: {
     *      name:        string,
     *      symbol:      string
     *      accidental:  Accidental,
     *      lowerFigure: string,
     *      upperFigure: string,
     *      bassFigure:  string
     *  }
     * }} The chord's current representation
     * @contributors Nolan
     */
    getRepresentation() {
        return this.#representations[this.#representationIndex];
    }
}