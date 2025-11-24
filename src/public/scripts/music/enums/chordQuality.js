import ChordQualityType from "./chordQualityType.js";

/**
 * Represents chord qualities with their associated properties.
 * @enum {number} 
 * @readonly
 */
const ChordQuality = (() => {
    const VALUES = Object.freeze({
        MAJOR_TRIAD:                 0,
        MINOR_TRIAD:                 1,
        DIMINISHED_TRIAD:            2,
        AUGMENTED_TRIAD:             3,
        SUSPENDED_TWO:               4,
        SUSPENDED_FOUR:              5,
        MAJOR_MAJOR_SEVEN:           6, // AKA major seven
        MAJOR_MINOR_SEVEN:           7, // AKA dominant seven
        MINOR_MAJOR_SEVEN:           8,
        MINOR_MINOR_SEVEN:           9, // AKA minor seven
        HALF_DIMINISHED_SEVEN:       10,
        DIMINISHED_SEVEN:            11,
    });

    // Note: all properties are relative to the root inversion
    // TODO: Implement qualities that implement the prefix and lower symbol descriptors
    const PROPERTIES = Object.freeze({
        [VALUES.MAJOR_TRIAD]: {
            intervals: [4, 3],
            name: "major",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "" },
            isLowercase: false,
            type: ChordQualityType.TRIAD
        },

        [VALUES.MINOR_TRIAD]: {
            intervals: [3, 4],
            name: "minor",
            symbolDescriptors: { prefix: "", suffix: "m", lower: "", upper: "" },
            isLowercase: true,
            type: ChordQualityType.TRIAD
        },

        [VALUES.DIMINISHED_TRIAD]: {
            intervals: [3, 3],
            name: "diminished",
            symbolDescriptors: { prefix: "", suffix: "°", lower: "", upper: "" },
            isLowercase: true,
            type: ChordQualityType.TRIAD
        },

        [VALUES.AUGMENTED_TRIAD]: {
            intervals: [4, 4],
            name: "augmented",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "+" },
            isLowercase: false,
            type: ChordQualityType.TRIAD
        },

        [VALUES.SUSPENDED_TWO]: {
            intervals: [2, 5],
            name: "suspended two",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "sus2" },
            isLowercase: false,
            type: ChordQualityType.OTHER
        },

        [VALUES.SUSPENDED_FOUR]: {
            intervals: [5, 2],
            name: "suspended four",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "sus4" },
            isLowercase: false,
            type: ChordQualityType.OTHER
        },

        [VALUES.MAJOR_MAJOR_SEVEN]: {
            intervals: [4, 3, 4],
            name: "major seven",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "M7" },
            isLowercase: false,
            type: ChordQualityType.SEVENTH
        },

        [VALUES.MAJOR_MINOR_SEVEN]: {
            intervals: [4, 3, 3],
            name: "dominant seven",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "7" },
            isLowercase: false,
            type: ChordQualityType.SEVENTH
        },

        [VALUES.MINOR_MAJOR_SEVEN]: {
            intervals: [3, 4, 4],
            name: "minor major seven",
            symbolDescriptors: { prefix: "", suffix: "m", lower: "", upper: "M7" },
            isLowercase: true,
            type: ChordQualityType.SEVENTH
        },

        [VALUES.MINOR_MINOR_SEVEN]: {
            intervals: [3, 4, 3],
            name: "minor dominant seven",
            symbolDescriptors: { prefix: "", suffix: "m", lower: "", upper: "7" },
            isLowercase: true,
            type: ChordQualityType.SEVENTH
        },

        [VALUES.HALF_DIMINISHED_SEVEN]: {
            intervals: [3, 3, 4],
            name: "half diminished",
            symbolDescriptors: { prefix: "", suffix: "", lower: "", upper: "ø7" },
            isLowercase: true,
            type: ChordQualityType.SEVENTH
        },

        // TODO: find better symbol for the suffix
        [VALUES.DIMINISHED_SEVEN]: {
            intervals: [3, 3, 3],
            name: "diminished seven",
            symbolDescriptors: { prefix: "", suffix: "°", lower: "", upper: "7" },
            isLowercase: true,
            type: ChordQualityType.SEVENTH
        },
    });

    /**
     * Gets the interval sizes for a chord quality's root inversion.
     * @param {ChordQuality} quality Quality to get the steps for. Must be in {@link ChordQuality.SUPPORTED_QUALITIES} to work.
     * @returns {number[]} Array of step sizes for the inputted chord quality (in half steps)
     * @contributors Nolan
     */
    function getIntervals(quality) {
        return PROPERTIES[quality].intervals;
    }

    /**
     * Gets the representation information for a chord quality
     * @param {ChordQuality} quality Quality to get the representation for. Must be in {@link ChordQuality.SUPPORTED_QUALITIES} to work.
     * @returns {{
     *  name:        string,
     *  isLowercase: boolean
     *  symbolDescriptors: {
     *      prefix:  string,
     *      suffix:  string,
     *      lower:   string,
     *      upper:   string
     *  },
     * }} The quality's representation information as a root inversion.
     * @contributors Nolan
     */
    function getRepresentation(quality) {
        const info = PROPERTIES[quality];
        return {
            name:        info.name,
            isLowercase: info.isLowercase,
            symbolDescriptors: {
                prefix:  info.symbolDescriptors.prefix,
                suffix:  info.symbolDescriptors.suffix,
                lower:   info.symbolDescriptors.lower,
                upper:   info.symbolDescriptors.upper
            },
        };
    }

    /**
     * Gets the type of a chord quality
     * @param {ChordQuality} quality Quality to get the type of
     * @returns {ChordQualityType} The type of the inputted chord quality
     */
    function getType(quality) {
        return PROPERTIES[quality].type;
    }

    /**
     * Returns true if the quality should make a Roman numeral symbol lowercase
     * @param {ChordQuality} quality Quality to get the information for
     * @returns {boolean} True if the chord quality is lowercase, false otherwise
     * @contributors Nolan
     */
    function isLowercase(quality) {
        return PROPERTIES[quality].isLowercase;
    }

    /**
     * Returns true if the quality requires "m" to be a suffix, indicating a minor chord
     * @param {ChordQuality} quality Quality to get information on
     * @returns {boolean} True if the quality's symbol descriptors has "m" as a suffix
     */
    function hasMinorSymbol(quality) {
        return (PROPERTIES[quality].symbolDescriptors.suffix === "m");
    }

    /**
     * List of {@link ChordQuality}'s that are supported by getter methods such as {@link ChordQuality.getRepresentation} and {@link getChordQualitySteps}.
     * @type ChordQuality[]
     * @readonly
     */
    const SUPPORTED_QUALITIES = Object.freeze(Object.keys(PROPERTIES).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        getIntervals,
        getRepresentation,
        getType,
        isLowercase,
        hasMinorSymbol,
        SUPPORTED_QUALITIES
    });
})();

export default ChordQuality;