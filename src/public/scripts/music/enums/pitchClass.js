import { PitchClassRepresentationType } from "./pitchClassRepresentationType.js";

/**
 * Available pitch classes. A difference of one means an interval of one half step.
 * @enum {number}
 * @readonly
 */
export const PitchClass = Object.freeze({
    /** Re-export of {@link PitchClassRepresentationType} */
    RepresentationType: PitchClassRepresentationType,

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

    NONE: -1
});

const PitchClassMap = Object.freeze({
    [PitchClass.C]: {
        basePitch: 261.63,
        representations: [
            { symbol: "B", symbolDescriptors: "#", name: "B sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "C", symbolDescriptors: "",  name: "C",       type: PitchClassRepresentationType.NATURAL },
        ]
    },

    [PitchClass.C_SHARP]: {
        basePitch: 277.18,
        representations: [
            { symbol: "C", symbolDescriptors: "#", name: "C sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "D", symbolDescriptors: "b", name: "D flat",  type: PitchClassRepresentationType.FLAT    },
        ]
    },

    [PitchClass.D]: {
        basePitch: 293.66,
        representations: [
            { symbol: "D", symbolDescriptors: "",  name: "D",       type: PitchClassRepresentationType.NATURAL },
        ]
    },

    [PitchClass.D_SHARP]: {
        basePitch: 311.13,
        representations: [
            { symbol: "D", symbolDescriptors: "#", name: "D sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "E", symbolDescriptors: "b", name: "E flat",  type: PitchClassRepresentationType.FLAT    },
        ]
    },

    [PitchClass.E]: {
        basePitch: 329.63,
        representations: [
            { symbol: "E", symbolDescriptors: "",  name: "E",       type: PitchClassRepresentationType.NATURAL },
            { symbol: "F", symbolDescriptors: "b", name: "F flat",  type: PitchClassRepresentationType.FLAT    },
        ]
    },

    [PitchClass.F]: {
        basePitch: 349.23,
        representations: [
            { symbol: "E", symbolDescriptors: "#", name: "E sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "F", symbolDescriptors: "",  name: "F",       type: PitchClassRepresentationType.NATURAL },
        ]
    },

    [PitchClass.F_SHARP]: {
        basePitch: 329.99,
        representations: [
            { symbol: "F", symbolDescriptors: "#", name: "F sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "G", symbolDescriptors: "b", name: "G flat",  type: PitchClassRepresentationType.FLAT    }
        ]
    },
    
    [PitchClass.G]: {
        basePitch: 392,
        representations: [
            { symbol: "G", symbolDescriptors: "",  name: "G",       type: PitchClassRepresentationType.NATURAL }
        ]
    },

    [PitchClass.G_SHARP]: {
        basePitch: 415.3,
        representations: [
            { symbol: "G", symbolDescriptors: "#", name: "G sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "A", symbolDescriptors: "b", name: "A flat",  type: PitchClassRepresentationType.FLAT    }
        ]
    },

    [PitchClass.A]: {
        basePitch: 440,
        representations: [
            { symbol: "A", symbolDescriptors: "",  name: "A",       type: PitchClassRepresentationType.NATURAL },
        ]
    },

    [PitchClass.A_SHARP]: {
        basePitch: 466.16,
        representations: [
            { symbol: "A", symbolDescriptors: "#", name: "A sharp", type: PitchClassRepresentationType.SHARP   },
            { symbol: "B", symbolDescriptors: "b", name: "B flat",  type: PitchClassRepresentationType.FLAT    },
        ]
    },

    [PitchClass.B]: {
        basePitch: 492.88,
        representations: [
            { symbol: "B", symbolDescriptors: "",  name: "B",       type: PitchClassRepresentationType.NATURAL },
            { symbol: "C", symbolDescriptors: "b", name: "C flat",  type: PitchClassRepresentationType.FLAT    },
        ]
    },
});

const PITCH_CLASS_BASE_OCTAVE = 4

/**
 * List of {@link PitchClass}' supported by pitch class getter methods, such as {@link getPitchClassRepresentation}.
 * @type {number[]}
 * @readonly
 */
export const ALL_SUPPORTED_PITCH_CLASSES = Object.freeze(Object.keys(PitchClassMap).map(str => Number(str)));

/**
 * Number of half steps in an octave
 * @type {number}
 * @constant
 */
export const OCTAVE_HALF_STEP_LENGTH = 12;

/**
 * Gets the list of possible representations for a pitch class.
 * @param {PitchClass} pitchClass Pitch class to get representations for. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
 * @returns {{
 *  symbol: string
 *  symbolDescriptors: string
 *  name: string
 *  type: PitchClassRepresentationType
 * }[]} List of representations for the inputted pitch class
 * @contributors Nolan
 */
export function getPitchClassRepresentations(pitchClass) {
    return PitchClassMap[pitchClass].representations;
}

/**
 * Gets the representation at an index for a pitch class.
 * @param {PitchClass} pitchClass Pitch class to get representation for. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
 * @param {number} index Integer index identifying which representation to fetch
 * @returns {{
 *  symbol: string
 *  symbolDescriptors: string
 *  name: string
 *  type: PitchClassRepresentationType
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