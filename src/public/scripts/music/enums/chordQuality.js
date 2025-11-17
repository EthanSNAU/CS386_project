/**
 * Represents chord qualities with their associated properties.
 * @enum {number} 
 * @readonly
 */
const ChordQuality = (() => {
    const VALUES = Object.freeze({
        MAJOR:           0,
        MINOR:           1,
        DIMINISHED:      2,
        AUGMENTED:       3,
        SUSPENDED_TWO:   4,
        SUSPENDED_FOUR:  5,
        DOMINANT_SEVEN:  6,
        HALF_DIMINISHED: 7
    });

    const PROPERTIES = Object.freeze({
        [VALUES.MAJOR]:           { steps: [4, 3],    centerSymbolDescriptors: "",     upperSymbolDescriptors: "",     name: "major",           isLowercase: false },
        [VALUES.MINOR]:           { steps: [3, 4],    centerSymbolDescriptors: "m",    upperSymbolDescriptors: "",     name: "minor",           isLowercase: true  },
        [VALUES.DIMINISHED]:      { steps: [3, 3],    centerSymbolDescriptors: "dim",  upperSymbolDescriptors: "",     name: "diminished",      isLowercase: true  },
        [VALUES.AUGMENTED]:       { steps: [4, 4],    centerSymbolDescriptors: "aug",  upperSymbolDescriptors: "",     name: "augmented",       isLowercase: false },
        [VALUES.SUSPENDED_TWO]:   { steps: [2, 5],    centerSymbolDescriptors: "",     upperSymbolDescriptors: "sus2", name: "suspended two",   isLowercase: false },
        [VALUES.SUSPENDED_FOUR]:  { steps: [5, 2],    centerSymbolDescriptors: "",     upperSymbolDescriptors: "sus4", name: "suspended four",  isLowercase: false },
        [VALUES.DOMINANT_SEVEN]:  { steps: [4, 3, 3], centerSymbolDescriptors: "",     upperSymbolDescriptors: "7",    name: "dominant seven",  isLowercase: false },
        [VALUES.HALF_DIMINISHED]: { steps: [3, 3, 4], centerSymbolDescriptors: "m",    upperSymbolDescriptors: "7b5",  name: "half diminished", isLowercase: true  },
    });

    /**
     * Gets the interval sizes for a chord quality
     * @param {ChordQuality} quality Quality to get the steps for. Must be in {@link ChordQuality.SUPPORTED_QUALITIES} to work.
     * @returns {number[]} Array of step sizes for the inputted chord quality (in half steps)
     * @contributors Nolan
     */
    function getSteps(quality) {
        return PROPERTIES[quality].steps;
    }

    /**
     * Gets the representation information for a chord quality
     * @param {ChordQuality} quality Quality to get the representation for. Must be in {@link ChordQuality.SUPPORTED_QUALITIES} to work.
     * @returns {{
     *  centerSymbolDescriptors: string
     *  upperSymbolDescriptors:  string
     *  name:                    string
     *  isLowercase:             boolean
     * }} The quality's representation information
     * @contributors Nolan
     */
    function getRepresentation(quality) {
        const info = PROPERTIES[quality];
        return {
            centerSymbolDescriptors: info.centerSymbolDescriptors,
            upperSymbolDescriptors:  info.upperSymbolDescriptors,
            name:              info.name,
            isLowercase:       info.isLowercase
        };
    }

    /**
     * Returns true if the quality should make a Roman numeral symbol lowercase
     * @param {ChordQuality} quality Quality to get the information for
     * @returns {boolean} True if the chord quality is lowercase, false otherwise
     * @contributors Nolan
     */
    function isLowercase(quality) {
        return (VALUES[quality].isLowercase);
    }

    /**
     * List of {@link ChordQuality}'s that are supported by getter methods such as {@link ChordQuality.getRepresentation} and {@link getChordQualitySteps}.
     * @type ChordQuality[]
     * @readonly
     */
    const SUPPORTED_QUALITIES = Object.freeze(Object.keys(PROPERTIES).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        getSteps,
        getRepresentation,
        isLowercase,
        SUPPORTED_QUALITIES
    });
})();

export default ChordQuality;