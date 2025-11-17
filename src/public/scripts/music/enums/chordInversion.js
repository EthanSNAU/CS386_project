/**
 * Available chord inversions
 * @enum {number}
 * @readonly
 */
export const ChordInversion = Object.freeze({
    ROOT:   0,
    FIRST:  1,
    SECOND: 2
});

/**
 * List of {@link ChordInversion}s supported by getter methods such as 
 * @type ChordInversion[]
 * @readonly
 */
// export const ALL_SUPPORTED_CHORD_INVERSIONS = Object.freeze(Object.keys(ChordInversionMap).map(str => parseInt(str)));