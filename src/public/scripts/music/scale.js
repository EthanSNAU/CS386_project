import { PitchClass, PitchClassRepresentationType, ALL_SUPPORTED_PITCH_CLASSES, getPitchClassRepresentation, } from "./enums/pitchClass.js";
import { ReferentialScale, getReferentialScaleSteps } from "./enums/referentialScale.js";

const RomanNumMap = Object.freeze({
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
});

const WordNumMap = Object.freeze({
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
});

function convertToRoman(num) {
    return RomanNumMap[num];
}

function convertToWord(num) {
    return WordNumMap[num];
}


// TODO: add ability for users to toggle between different symbols (eg. G# vs. Ab)
// TODO: add ability to transpose a chord
export class Scale {
    static RootPitchClass = PitchClass;
    static ReferentialScale = ReferentialScale;
    static PitchClassRepresentationType = PitchClassRepresentationType;

    #rootPitchClass
    #octave // tracks the user's preferred symbols (eg. G# vs. Ab)
    #referentialScale // tracks the notes that are used for chord labeling

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
                    type: PitchClassRepresentationType.NATURAL,
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
                lowerName += " sharp";
            }

            let upperSymbol = convertToRoman(upperReferentialIndex + 1);
            let upperSymbolDescriptors = "";
            let upperName = convertToWord(upperReferentialIndex + 1);
            const numFlats = this.#referentialScale[upperReferentialIndex] - octavePitchClass;

            for (let i = 0; i < numFlats; i++) {
                upperSymbolDescriptors += "b";
                upperName += " flat";
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

    getRootPitchClass() {
        return this.#rootPitchClass;
    }
}

// module.exports = {
//     Scale,
//     REFERENTIAL_SCALE
// }