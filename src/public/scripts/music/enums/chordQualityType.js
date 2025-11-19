/**
 * Represents types of chord qualities and their associated properties (i.e. triad vs. seventh)
 * @enum {number}
 * @readonly
 */
const ChordQualityType = (() => {
    const VALUES = Object.freeze({
        TRIAD:   0,
        SEVENTH: 1,
        OTHER:   2,
    });

    const PROPERTIES = Object.freeze({
        [VALUES.TRIAD]:   {
            inversionDescriptors: [
                { upper: "",  lower: ""  },
                { upper: "6", lower: ""  },
                { upper: "6", lower: "4" }
            ]
        },

        [VALUES.SEVENTH]: {
            inversionDescriptors: [
                { upper: "",  lower: ""  },
                { upper: "65", lower: "" },
                { upper: "43", lower: "" },
                { upper: "42", lower: "" }
            ]
        },
        [VALUES.OTHER]: {
            inversionDescriptors: null
        }
    });

    /**
     * Gets the inversion symbols for a certain chord quality type and inversion
     * @param {ChordQualityType} chordQualityType The quality type
     * @param {number} inversion The inversion. 0 means the root inversion, 1, means the first, and so on. Invalid values will cause an error.
     * @returns {{
     *  upper: string,
     *  lower: string
     * } | null} The inversion descriptors. If chordQualityType is ChordQualityType.other, then it returns null.
     * @contributors Nolan
     */
    function getInversionDescriptors(chordQualityType, inversion) {
        if (chordQualityType === VALUES.OTHER) return null;
        return PROPERTIES[chordQualityType].inversionDescriptors[inversion];
    }

    const SUPPORTED_TYPES = Object.freeze(Object.keys(PROPERTIES).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        getInversionDescriptors,
        SUPPORTED_TYPES
    });
})();

export default ChordQualityType;