/**
 * Represents accidentals with their associated properties (i.e. sharp, flat, etc.)
 * @enum {number}
 * @readonly
 */
const Accidental = (() => {
    const VALUES = Object.freeze({
        NATURAL: 0,
        SHARP:   1,
        FLAT:    2
    });

    const PROPERTIES = Object.freeze({
        [VALUES.NATURAL]: { symbol: "",  name: ""      },
        [VALUES.SHARP]:   { symbol: "#", name: "sharp" },
        [VALUES.FLAT]:    { symbol: "b", name: "flat"  }
    });

    /**
     * Gets a pitch class descriptor's representation information.
     * @param {Accidental} accidental Descriptor to get the representation for. Must be in {@link Accidental.SUPPORTED_ACCIDENTALS} to work.
     * @returns {{
     *  symbol: string,
     *  name:   string
     * }} Representation associated with the accidental
     */
    function getRepresentation(accidental) {
        return PROPERTIES[accidental];
    };

    /**
     * List of {@link Accidental}s supported by getter methods, such as {@link Accidental.getRepresentation}.
     * @type Accidental[]
     * @readonly
     */
    const SUPPORTED_ACCIDENTALS = Object.freeze(Object.keys(PROPERTIES).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        getRepresentation,
        SUPPORTED_ACCIDENTALS
    });
})();

export default Accidental;