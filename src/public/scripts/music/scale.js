import { PitchClass, ALL_SUPPORTED_PITCH_CLASSES, getPitchClassRepresentation, } from "./enums/pitchClass.js";
import { ReferentialScale, getReferentialScaleSteps } from "./enums/referentialScale.js";
import { convertToRoman, convertToWord } from "./numberConversion.js"

// documentation imports
import { PitchClassRepresentationType } from "./enums/pitchClassRepresentationType.js";

// TODO: add ability for users to toggle between different symbols (eg. G# vs. Ab)
// TODO: add ability to switch to different referential scale

/**
 * Manages the alphabetical and Roman numeral representations of all pitch classes.
 */
export class Scale {
    /** Re-export of {@link PitchClass} */
    static RootPitchClass = PitchClass;

    /** Re-export of {@link ReferentialScale} */
    static ReferentialScale = ReferentialScale;

    /** Re-export of {@link PitchClassRepresentationType} */
    static PitchClassRepresentationType = PitchClass.RepresentationType;

    #rootPitchClass
    #octave // tracks the user's preferred symbols (eg. G# vs. Ab)
    #referentialScale // tracks the notes that are used for chord labeling

    /**
     * Creates an instance of {@link Scale}.
     * @param {PitchClass} pitchClass Pitch class to represent the beginning of the scale
     * @param {ReferentialScale} referentialScale Referential scale for Roman numeral conversion
     * @contributors Nolan
     */
    constructor(rootPitchClass, referentialScale = Scale.ReferentialScale.IONIAN_MAJOR) {
        this.#rootPitchClass = rootPitchClass;
        this.#octave = {};

        let currentPitchClassIndex = ALL_SUPPORTED_PITCH_CLASSES.findIndex(pitchClass => pitchClass == rootPitchClass);

        const addNewOctaveNote = () => {
            const newNote = {
                alphabeticalRepresentationIndex: 0,
                romanRepresentations: [],
                romanRepresentationIndex: 0,
            };

            this.#octave[ALL_SUPPORTED_PITCH_CLASSES[currentPitchClassIndex]] = newNote;
        }

        // fill in the octave
        while (currentPitchClassIndex < ALL_SUPPORTED_PITCH_CLASSES.length) {
            addNewOctaveNote();
            currentPitchClassIndex++;
        }

        for (currentPitchClassIndex = 0; ALL_SUPPORTED_PITCH_CLASSES[currentPitchClassIndex] != rootPitchClass; currentPitchClassIndex++) {
            addNewOctaveNote();
        }

        // fill in the referential scale
        this.#referentialScale = [rootPitchClass];
        const referentialScaleSteps = getReferentialScaleSteps(referentialScale);
        let currentPitchClass = rootPitchClass;

        for (const step of referentialScaleSteps) {
            currentPitchClass += step;
            this.#referentialScale.push(currentPitchClass);
        }

        const referentialScaleLength = this.#referentialScale.length;
        const minReferentialScaleIndex = this.#referentialScale.indexOf(Math.min(...this.#referentialScale));

        // fill in the roman numerals
        for (const [octavePitchClass, octaveRepresentation] of Object.entries(this.#octave)) {
            // find where the pitch class resides on the referential scale
            // find the minimum, then loop through the array until a pitch higher than the inputted pitch class is found
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
                    type: PitchClass.RepresentationType.NATURAL,
                    symbolDescriptors: ""
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
            let lowerSymbol = convertToRoman(lowerReferentialIndex + 1);
            let lowerSymbolDescriptors = "";
            let lowerName = convertToWord(lowerReferentialIndex + 1);
            const numSharps = octavePitchClass - this.#referentialScale[lowerReferentialIndex];

            for (let i = 0; i < numSharps; i++) {
                lowerSymbolDescriptors += "#";
                lowerName = "sharp " + lowerName;
            }

            let upperSymbol = convertToRoman(upperReferentialIndex + 1);
            let upperSymbolDescriptors = "";
            let upperName = convertToWord(upperReferentialIndex + 1);
            const numFlats = this.#referentialScale[upperReferentialIndex] - octavePitchClass;

            for (let i = 0; i < numFlats; i++) {
                upperSymbolDescriptors += "b";
                upperName = "flat " + lowerName;
            }

            const lowerRepresentation = {
                symbol: lowerSymbol,
                symbolDescriptors: lowerSymbolDescriptors ?? "",
                name: lowerName,
                type: Scale.PitchClassRepresentationType.SHARP
            };

            const upperRepresentation = {
                symbol: upperSymbol,
                symbolDescriptors: upperSymbolDescriptors ?? "",
                name: upperName,
                type: Scale.PitchClassRepresentationType.FLAT
            };

            octaveRepresentation.romanRepresentations.push(lowerRepresentation);
            octaveRepresentation.romanRepresentations.push(upperRepresentation);
        }
    }

    /**
     * Gets the currently-active representation of a pitch class.
     * @param {PitchClass} pitchClass Pitch class to get the representation for
     * @returns {{
    *   alphabeticalName:                     string
    *   alphabeticalSymbol:                   string
    *   alphabeticalType:                     string
    *   alphabeticalCenterSymbolDescriptors:  string
    *   romanName:                            string
    *   romanSymbol:                          string
    *   romanType:                            string
    *   romanCenterSymbolDescriptors:         string
     * }} The pitch class' representation information
     * @contributors Nolan
     */
    getRepresentationFor(pitchClass) {
        const representationInfo = this.#octave[pitchClass];
        const alphabeticalRepresentation = getPitchClassRepresentation(pitchClass, representationInfo.alphabeticalRepresentationIndex);
        const romanRepresentation = representationInfo.romanRepresentations[representationInfo.romanRepresentationIndex];

        const pitchClassRepresentation = {
            alphabeticalName:                     alphabeticalRepresentation.name,
            alphabeticalSymbol:                   alphabeticalRepresentation.symbol,
            alphabeticalType:                     alphabeticalRepresentation.type,
            alphabeticalCenterSymbolDescriptors:  alphabeticalRepresentation.symbolDescriptors,
            romanName:                            romanRepresentation.name,
            romanSymbol:                          romanRepresentation.symbol,
            romanType:                            romanRepresentation.type,
            romanCenterSymbolDescriptors:         romanRepresentation.symbolDescriptors,
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

// module.exports = {
//     Scale,
//     REFERENTIAL_SCALE
// }