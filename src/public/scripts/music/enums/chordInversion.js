/**
 * Represents chord inversions and their associated properties
 * @enum {number}
 * @readonly
 */
const ChordInversion = (() => {
    const VALUES = Object.freeze({
        ROOT:   0,
        FIRST:  1,
        SECOND: 2
    });

    /**
     * List of {@link ChordInversion}s supported by getter methods such as 
     * @type ChordInversion[]
     * @readonly
     */
    // const SUPPORTED_INVERSIONS = Object.freeze(Object.keys(ChordInversionMap).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        // SUPPORTED_INVERSIONS
    })
})();

export default ChordInversion;