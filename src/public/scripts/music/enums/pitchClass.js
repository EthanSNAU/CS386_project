import Accidental from "./accidental.js";

/**
 * Represents pitch classes and their associated properties. A difference of one means a difference of one half step.
 * @enum {number}
 * @readonly
 */
const PitchClass = (() => {
    const VALUES = Object.freeze({
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

    const BASE_PITCH_OCTAVE = 4;

    const PROPERTIES = Object.freeze({
        [VALUES.C]: {
            basePitch: 261.63,
            representations: [
                { symbol: "C", accidental: Accidental.NATURAL },
                { symbol: "B", accidental: Accidental.SHARP   },
            ]
        },

        [VALUES.C_SHARP]: {
            basePitch: 277.18,
            representations: [
                { symbol: "C", accidental: Accidental.SHARP   },
                { symbol: "D", accidental: Accidental.FLAT    },
            ]
        },

        [VALUES.D]: {
            basePitch: 293.66,
            representations: [
                { symbol: "D", accidental: Accidental.NATURAL },
            ]
        },

        [VALUES.D_SHARP]: {
            basePitch: 311.13,
            representations: [
                { symbol: "D", accidental: Accidental.SHARP   },
                { symbol: "E", accidental: Accidental.FLAT    },
            ]
        },

        [VALUES.E]: {
            basePitch: 329.63,
            representations: [
                { symbol: "E", accidental: Accidental.NATURAL },
                { symbol: "F", accidental: Accidental.FLAT    },
            ]
        },

        [VALUES.F]: {
            basePitch: 349.23,
            representations: [
                { symbol: "E", accidental: Accidental.SHARP   },
                { symbol: "F", accidental: Accidental.NATURAL },
            ]
        },

        [VALUES.F_SHARP]: {
            basePitch: 369.99,
            representations: [
                { symbol: "F", accidental: Accidental.SHARP   },
                { symbol: "G", accidental: Accidental.FLAT    }
            ]
        },
        
        [VALUES.G]: {
            basePitch: 392,
            representations: [
                { symbol: "G", accidental: Accidental.NATURAL }
            ]
        },

        [VALUES.G_SHARP]: {
            basePitch: 415.3,
            representations: [
                { symbol: "G", accidental: Accidental.SHARP   },
                { symbol: "A", accidental: Accidental.FLAT    }
            ]
        },

        [VALUES.A]: {
            basePitch: 440,
            representations: [
                { symbol: "A", accidental: Accidental.NATURAL },
            ]
        },

        [VALUES.A_SHARP]: {
            basePitch: 466.16,
            representations: [
                { symbol: "A", accidental: Accidental.SHARP   },
                { symbol: "B", accidental: Accidental.FLAT    },
            ]
        },

        [VALUES.B]: {
            basePitch: 492.88,
            representations: [
                { symbol: "B", accidental: Accidental.NATURAL },
                { symbol: "C", accidental: Accidental.FLAT    },
            ]
        },
    });

    /**
     * Gets the list of possible representations for a pitch class.
     * @param {PitchClass} pitchClass Pitch class to get representations for. Must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} to work.
     * @returns {{
     *  symbol:            string
     *  name:              string
     *  accidental:        Accidental
     * }[]} List of representations for the inputted pitch class
     * @contributors Nolan
     */
    function getRepresentations(pitchClass) {
        const representations = [];
        const numRepresentations = PROPERTIES[pitchClass].representations.length;
        for (let i = 0; i < numRepresentations; i++) {
            representations.push(getRepresentation(pitchClass, i));
        }

        return representations;
    }

    /**
     * Gets the representation at an index for a pitch class.
     * @param {PitchClass} pitchClass Pitch class to get representation for. Must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} to work.
     * @param {number} index Integer index identifying which representation to fetch
     * @returns {{
     *  symbol:            string
     *  name:              string
     *  accidental:        Accidental
     * }} Representation for the inputted pitch class
     * @contributors Nolan
     */
    function getRepresentation(pitchClass, index) {
        const representation = structuredClone(PROPERTIES[pitchClass].representations[index]);

        const accidentalRepresentation = Accidental.getRepresentation(representation.accidental);

        representation.name = representation.symbol;

        if (accidentalRepresentation.name) {
            representation.name += " " + accidentalRepresentation.name;
        }

        representation.symbol += accidentalRepresentation.symbol;

        return representation;
    }

    /**
     * Calculates a pitch class' pitch in an octave
     * @param {PitchClass} pitchClass Pitch class to get the pitch for. Must be in {@link PitchClass.SUPPORTED_PITCH_CLASSES} to work.
     * @param {number} octave Integer identifying which octave the pitch class is in
     * @returns {number} Pitch of the pitch class
     * @contributors Nolan
     */
    function getPitch(pitchClass, octave) {
        return Math.pow(2, octave - BASE_PITCH_OCTAVE) * PROPERTIES[pitchClass].basePitch;
    }

    /**
     * Returns true if the pitch class is supported by getter methods, such as {@link PitchClass.getRepresentation}.
     * @param {PitchClass} pitchClass Pitch class to test validity
     * @returns {boolean} True if the pitch class is supported, false otherwise
     * @contributors Nolan
     */
    function isSupported(pitchClass) {
        // Note: PitchClass.NONE returns false
        return SUPPORTED_PITCH_CLASSES.includes(pitchClass);
    }

    /**
     * List of {@link PitchClass}es supported by pitch class getter methods, such as {@link PitchClass.getRepresentation}.
     * @type PitchClass[]
     * @readonly
     */
    const SUPPORTED_PITCH_CLASSES = Object.freeze(Object.keys(PROPERTIES).map(str => Number(str)));

    return Object.freeze({
        ...VALUES,
        getRepresentations,
        getRepresentation,
        getPitch,
        isSupported,
        SUPPORTED_PITCH_CLASSES
    });
})();

export default PitchClass;