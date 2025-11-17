/**
 * Available accidentals
 * @enum {number}
 * @readonly
 */
export const Accidental = Object.freeze({
    NATURAL: 0,
    SHARP:   1,
    FLAT:    2
});

const AccidentalMap = Object.freeze({
    [Accidental.NATURAL]: { symbol: "",  name: ""      },
    [Accidental.SHARP]:   { symbol: "#", name: "sharp" },
    [Accidental.FLAT]:    { symbol: "b", name: "flat"  }
});

/**
 * List of {@link Accidental}s supported by getter methods, such as {@link getAccidentalRepresentation}.
 * @type Accidental[]
 * @readonly
 */
export const ALL_SUPPORTED_ACCIDENTALS = Object.freeze(Object.keys(AccidentalMap).map(str => parseInt(str)));

/**
 * Gets a pitch class descriptor's representation information.
 * @param {Accidental} accidental Descriptor to get the representation for. Must be in {@link ALL_SUPPORTED_ACCIDENTALS} to work.
 * @returns {{
 *  symbol: string,
 *  name:   string
 * }} Representation associated with the accidental
 */
export function getAccidentalRepresentation(accidental) {
    return AccidentalMap[accidental];
};