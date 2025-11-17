import { Accidental, getAccidentalRepresentation } from "./accidental.js";

/**
 * Available pitch classes. A difference of one means an interval of one half step.
 * @enum {number}
 * @readonly
 */
export const PitchClass = Object.freeze({
    C:       0,
    C_SHARP: 1,
    D_FLAT:  1,
    D:       2,
    D_SHARP: 3,
    E_FLAT:  3,
    E:       4,
    F_FLAT:  4,
    E_SHARP: 5,
    F:       5,
    F_SHARP: 6,
    G_FLAT:  6,
    G:       7,
    G_SHARP: 8,
    A_FLAT:  8,
    A:       9,
    A_SHARP: 10,
    B_FLAT:  10,
    B:       11,

    NONE:    -1,
});

const PitchClassMap = Object.freeze({
    [PitchClass.C]: {
        basePitch: 261.63,
        representations: [
            { symbol: "B", accidental: Accidental.SHARP   },
            { symbol: "C", accidental: Accidental.NATURAL },
        ]
    },

    [PitchClass.C_SHARP]: {
        basePitch: 277.18,
        representations: [
            { symbol: "C", accidental: Accidental.SHARP   },
            { symbol: "D", accidental: Accidental.FLAT    },
        ]
    },

    [PitchClass.D]: {
        basePitch: 293.66,
        representations: [
            { symbol: "D", accidental: Accidental.NATURAL },
        ]
    },

    [PitchClass.D_SHARP]: {
        basePitch: 311.13,
        representations: [
            { symbol: "D", accidental: Accidental.SHARP   },
            { symbol: "E", accidental: Accidental.FLAT    },
        ]
    },

    [PitchClass.E]: {
        basePitch: 329.63,
        representations: [
            { symbol: "E", accidental: Accidental.NATURAL },
            { symbol: "F", accidental: Accidental.FLAT    },
        ]
    },

    [PitchClass.F]: {
        basePitch: 349.23,
        representations: [
            { symbol: "E", accidental: Accidental.SHARP   },
            { symbol: "F", accidental: Accidental.NATURAL },
        ]
    },

    [PitchClass.F_SHARP]: {
        basePitch: 329.99,
        representations: [
            { symbol: "F", accidental: Accidental.SHARP   },
            { symbol: "G", accidental: Accidental.FLAT    }
        ]
    },
    
    [PitchClass.G]: {
        basePitch: 392,
        representations: [
            { symbol: "G", accidental: Accidental.NATURAL }
        ]
    },

    [PitchClass.G_SHARP]: {
        basePitch: 415.3,
        representations: [
            { symbol: "G", accidental: Accidental.SHARP   },
            { symbol: "A", accidental: Accidental.FLAT    }
        ]
    },

    [PitchClass.A]: {
        basePitch: 440,
        representations: [
            { symbol: "A", accidental: Accidental.NATURAL },
        ]
    },

    [PitchClass.A_SHARP]: {
        basePitch: 466.16,
        representations: [
            { symbol: "A", accidental: Accidental.SHARP   },
            { symbol: "B", accidental: Accidental.FLAT    },
        ]
    },

    [PitchClass.B]: {
        basePitch: 492.88,
        representations: [
            { symbol: "B", accidental: Accidental.NATURAL },
            { symbol: "C", accidental: Accidental.FLAT    },
        ]
    },
});

/**
 * List of {@link PitchClass}' supported by pitch class getter methods, such as {@link getPitchClassRepresentation}.
 * @type PitchClass[]
 * @readonly
 */
export const ALL_SUPPORTED_PITCH_CLASSES = Object.freeze(Object.keys(PitchClassMap).map(str => Number(str)));

/**
 * Number of half steps in an octave
 * @type {number}
 * @constant
 */
export const OCTAVE_HALF_STEP_LENGTH = 12;

const PITCH_CLASS_BASE_OCTAVE = 4

/**
 * Gets the list of possible representations for a pitch class.
 * @param {PitchClass} pitchClass Pitch class to get representations for. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
 * @returns {{
 *  symbol:            string
 *  symbolDescriptors: string
 *  name:              string
 *  accidental:        Accidental
 * }[]} List of representations for the inputted pitch class
 * @contributors Nolan
 */
export function getPitchClassRepresentations(pitchClass) {
    const representations = PitchClassMap[pitchClass].representations;

    for (const representation of representations) {
        const accidentalRepresentation = getAccidentalRepresentation(representation.accidental);

        representation.name = representation.symbol;

        if (accidentalRepresentation.name) {
            representation.name += " " + accidentalRepresentation.name;
        }

        representation.symbolDescriptors = accidentalRepresentation.symbol;
    }

    return representations;
}

/**
 * Gets the representation at an index for a pitch class.
 * @param {PitchClass} pitchClass Pitch class to get representation for. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
 * @param {number} index Integer index identifying which representation to fetch
 * @returns {{
 *  symbol:            string
 *  symbolDescriptors: string
 *  name:              string
 *  accidental:        Accidental
 * }} Representation for the inputted pitch class
 * @contributors Nolan
 */
export function getPitchClassRepresentation(pitchClass, index) {
    return getPitchClassRepresentations(pitchClass)[index];
}

/**
 * Calculates a pitch class' pitch in an octave
 * @param {PitchClass} pitchClass Pitch class to get the pitch for. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
 * @param {number} octave Integer identifying which octave the pitch class is in
 * @returns {number} Pitch of the pitch class
 * @contributors Nolan
 */
export function getPitchClassPitch(pitchClass, octave) {
    return Math.pow(2, octave - PITCH_CLASS_BASE_OCTAVE) * PitchClassMap[pitchClass].basePitch;
}