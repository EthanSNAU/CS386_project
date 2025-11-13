import { PITCH_CLASS_REPRESENTATION_TYPE, SUPPORTED_PITCH_CLASSES, NUM_PITCH_CLASSES, getPitchClassRepresentation, } from "./pitchClass.js";

export const REFERENTIAL_SCALE = Object.freeze({
    IONIAN_MAJOR: 0,
    IONIAN_NATURAL_MINOR: 1
    // TODO: add more
});

// "steps" refers to half steps
// the steps must be in order, so unless the constructor is changed, ionian natural minor and aeolian major are NOT the same
const ReferentialScaleMap = Object.freeze({
    [REFERENTIAL_SCALE.IONIAN_MAJOR]:         { steps: [2, 2, 1, 2, 2, 2] },
    [REFERENTIAL_SCALE.IONIAN_NATURAL_MINOR]: { steps: [2, 1, 2, 2, 1, 2] }
});

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
    #rootPitchClass
    #octave // tracks the user's preferred symbols (eg. G# vs. Ab)
    #referentialScale // tracks the notes that are used for chord labeling

    constructor(rootPitchClass, referentialScale = REFERENTIAL_SCALE.IONIAN_MAJOR) {
        this.#rootPitchClass = rootPitchClass;
        this.#octave = {};

        let currentPitchClassIndex = SUPPORTED_PITCH_CLASSES.findIndex(pitchClass => pitchClass == rootPitchClass);

        const addNewOctaveNote = () => {
            const newNote = {
                alphabeticalRepresentationIndex: 0,
                romanRepresentations: [],
                romanRepresentationIndex: 0,
            };

            this.#octave[SUPPORTED_PITCH_CLASSES[currentPitchClassIndex]] = newNote;
        }

        // fill in the octave
        while (currentPitchClassIndex < NUM_PITCH_CLASSES) {
            addNewOctaveNote();
            currentPitchClassIndex++;
        }

        for (currentPitchClassIndex = 0; SUPPORTED_PITCH_CLASSES[currentPitchClassIndex] != rootPitchClass; currentPitchClassIndex++) {
            addNewOctaveNote();
        }

        // fill in the referential scale
        this.#referentialScale = [rootPitchClass];
        const referentialScaleSteps = ReferentialScaleMap[referentialScale].steps;
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
                    type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL
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
            let lowerName = convertToWord(lowerReferentialIndex + 1);
            const numSharps = octaveRepresentation - this.#referentialScale[lowerReferentialIndex];

            for (let i = 0; i < numSharps; i++) {
                lowerSymbol += "#";
                upperName += " sharp";
            }

            let upperSymbol = convertToRoman(upperReferentialIndex + 1);
            let upperName = convertToWord(upperReferentialIndex + 1);
            const numFlats = this.#referentialScale[upperReferentialIndex] - octaveRepresentation;

            for (let i = 0; i < numSharps; i++) {
                upperSymbol += "b";
                upperName += " flat";
            }
            
            octaveRepresentation.romanRepresentations.push({
                symbol: lowerSymbol,
                name: lowerName,
                type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP
            });

            octaveRepresentation.romanRepresentations.push({
                symbol: upperSymbol,
                name: upperName,
                type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT
            });
        }
    }

    getRepresentationFor(pitchClass) {
        const representationInfo = this.#octave[pitchClass];
        const alphabeticalRepresentation = getPitchClassRepresentation(pitchClass, representationInfo.alphabeticalRepresentationIndex);
        const romanRepresentation = representationInfo.romanRepresentations[representationInfo.romanRepresentationIndex];
        return {
            alphabeticalName:   alphabeticalRepresentation.name,
            alphabeticalSymbol: alphabeticalRepresentation.symbol,
            alphabeticalType:   alphabeticalRepresentation.type,
            romanName:   romanRepresentation.name,
            romanSymbol: romanRepresentation.symbol,
            romanType:   romanRepresentation.type,
        };
    }

    getRootPitchClass() {
        return this.#rootPitchClass;
    }
}

// module.exports = {
//     Scale,
//     REFERENTIAL_SCALE
// }