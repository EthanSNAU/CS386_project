import { Accidental, PitchClass, ReferentialScale } from "./enums";
import { convertToRoman, convertToWord } from "./numberConversion.js"

// TODO: add ability for users to toggle between different symbols (eg. G# vs. Ab)
// TODO: add ability to switch to different referential scale

/**
 * Manages the alphabetical and Roman numeral representations of all pitch classes.
 */
export class Scale {
    #rootPitchClass
    #octave // tracks the user's preferred symbols (eg. G# vs. Ab)
    #referentialScale // tracks the notes that are used for chord labeling

    /**
     * Creates an instance of {@link Scale}.
     * @param {PitchClass} pitchClass Pitch class to represent the beginning of the scale
     * @param {ReferentialScale} referentialScale Referential scale for Roman numeral conversion
     * @contributors Nolan
     */
    constructor(rootPitchClass, referentialScale = ReferentialScale.IONIAN_MAJOR) {
        this.#rootPitchClass = rootPitchClass;
        this.#octave = {};

        let currentPitchClassIndex = PitchClass.SUPPORTED_PITCH_CLASSES.findIndex(pitchClass => pitchClass === rootPitchClass);

        const addNewOctaveNote = () => {
            const newNote = {
                alphabeticalRepresentationIndex: 0,
                romanRepresentations: [],
                romanRepresentationIndex: 0,
            };

            this.#octave[PitchClass.SUPPORTED_PITCH_CLASSES[currentPitchClassIndex]] = newNote;
        }

        // fill in the octave
        while (currentPitchClassIndex < PitchClass.SUPPORTED_PITCH_CLASSES.length) {
            addNewOctaveNote();
            currentPitchClassIndex++;
        }

        for (currentPitchClassIndex = 0; PitchClass.SUPPORTED_PITCH_CLASSES[currentPitchClassIndex] != rootPitchClass; currentPitchClassIndex++) {
            addNewOctaveNote();
        }

        // fill in the referential scale
        this.#referentialScale = [rootPitchClass];
        const referentialScaleSteps = ReferentialScale.getIntervals(referentialScale);
        let currentPitchClass = rootPitchClass;

        for (const step of referentialScaleSteps) {
            currentPitchClass += step;
            this.#referentialScale.push(currentPitchClass);
        }

        const referentialScaleLength = this.#referentialScale.length;
        const minReferentialScaleIndex = this.#referentialScale.indexOf(Math.min(...this.#referentialScale));

        // fill in the roman numerals

        const SHARP_REPRESENTATION = Accidental.getRepresentation(Accidental.SHARP);
        const FLAT_REPRESENTATION  = Accidental.getRepresentation(Accidental.FLAT);

        for (const [octavePitchClass, octaveRepresentation] of Object.entries(this.#octave)) {
            // find where the pitch class resides on the referential scale
            // find the minimum pitch class, then loop through the array until a pitch higher than the inputted pitch class is found
            // (implement binary search for optimization later)
            let numIterations = 0;
            let currentReferentialIndex = minReferentialScaleIndex;

            while (this.#referentialScale[currentReferentialIndex] < octavePitchClass
                   && currentReferentialIndex < referentialScaleLength) {
                numIterations++;
                currentReferentialIndex++;
            }

            if (currentReferentialIndex >= referentialScaleLength) {
                currentReferentialIndex = 0;
                while (this.#referentialScale[currentReferentialIndex] < octavePitchClass
                    && numIterations < referentialScaleLength) {
                    numIterations++;
                    currentReferentialIndex++;
                }
            }

            // if we've exhausted all options, then the octave pitch class is greater than all pitch classes
            // in the referential scale, which is erroneous
            if (numIterations >= referentialScaleLength) {
                console.error("[Scale.prototype.constructor()] Error: Erroneous pitch class detected in the octave.");
                return;
            }

            // if there is an exact match, use it and continue
            if (this.#referentialScale[currentReferentialIndex] == octavePitchClass) {
                octaveRepresentation.romanRepresentations.push({
                    symbol: convertToRoman(currentReferentialIndex + 1),
                    name: convertToWord(currentReferentialIndex + 1),
                    accidental: Accidental.NATURAL,
                });
                continue;
            }

            // otherwise, we need to find the lower and upper referentials and add sharps/flats
            
            // if we are at the beginning of the array, then use the beginning as the upper pitch and end as the lower pitch
            // otherwise, the needed referential notes are adjacent in the array
            
            let lowerReferentialIndex;
            let upperReferentialIndex;
            if (currentReferentialIndex == 0) {
                lowerReferentialIndex = referentialScaleLength - 1;
                upperReferentialIndex = 0;
            } else {
                lowerReferentialIndex = currentReferentialIndex - 1;
                upperReferentialIndex = currentReferentialIndex;
            }

            // build the final strings and push
            // TODO: if we add double sharps and double flats, use those representations instead of repeated sharps/flats
            let lowerSymbol = convertToRoman(lowerReferentialIndex + 1);
            let lowerName = convertToWord(lowerReferentialIndex + 1);
            const numSharps = octavePitchClass - this.#referentialScale[lowerReferentialIndex];

            for (let i = 0; i < numSharps; i++) {
                lowerSymbol = SHARP_REPRESENTATION.symbol + lowerSymbol;
                lowerName = SHARP_REPRESENTATION.name + " " + lowerName;
            }

            let upperSymbol = convertToRoman(upperReferentialIndex + 1);
            let upperName = convertToWord(upperReferentialIndex + 1);
            const numFlats = this.#referentialScale[upperReferentialIndex] - octavePitchClass;

            for (let i = 0; i < numFlats; i++) {
                upperSymbol = FLAT_REPRESENTATION.symbol + upperSymbol;
                upperName = FLAT_REPRESENTATION.name + " " + upperName;
            }

            const lowerRepresentation = {
                symbol:            lowerSymbol,
                name:              lowerName,
                accidental:        Accidental.SHARP
            };

            const upperRepresentation = {
                symbol:            upperSymbol,
                name:              upperName,
                accidental:        Accidental.FLAT
            };

            octaveRepresentation.romanRepresentations.push(lowerRepresentation);
            octaveRepresentation.romanRepresentations.push(upperRepresentation);
        }
    }

    /**
     * Gets the currently-active representation of a pitch class.
     * @param {PitchClass} pitchClass Pitch class to get the representation for
     * @returns {{
     *  alphabetical: {
     *      name:       string,
     *      symbol:     string,
     *      accidental: Accidental
     *  },
     *  roman: {
     *      name:       string
     *      symbol:     string
     *      accidental: Accidental
     *  }
     * }} The pitch class' representation information
     * @contributors Nolan
     */
    getRepresentation(pitchClass) {
        const representationInfo = this.#octave[pitchClass];
        const alphabeticalRepresentation = PitchClass.getRepresentation(pitchClass, representationInfo.alphabeticalRepresentationIndex);
        const romanRepresentation = representationInfo.romanRepresentations[representationInfo.romanRepresentationIndex];

        const pitchClassRepresentation = {
            alphabetical: {
                name:       alphabeticalRepresentation.name,
                symbol:     alphabeticalRepresentation.symbol,
                accidental: alphabeticalRepresentation.accidental,
            },
            roman: {
                name:       romanRepresentation.name,
                symbol:     romanRepresentation.symbol,
                accidental: romanRepresentation.accidental,
            }
        };

        return pitchClassRepresentation;
    }

    /**
     * Gets the scale's root pitch class.
     * @returns {PitchClass} The scale's root note's pitch class
     * @contributors Nolan
     */
    getRootPitchClass() {
        return this.#rootPitchClass;
    }
}