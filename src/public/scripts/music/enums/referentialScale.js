/**
 * Represents referential scales and their associated properties.
 * @enum {number} 
 * @readonly
 */
const ReferentialScale = (() => {
    const VALUES = Object.freeze({
        IONIAN_MAJOR: 0,
        IONIAN_NATURAL_MINOR: 1
        // TODO: add more
    });

    // "steps" refers to half steps
    const PROPERTIES = Object.freeze({
        [VALUES.IONIAN_MAJOR]:         { steps: [2, 2, 1, 2, 2, 2] },
        [VALUES.IONIAN_NATURAL_MINOR]: { steps: [2, 1, 2, 2, 1, 2] }
    });

    /**
     * Gets a referential scale's step intervals (in half steps).
     * @param {ReferentialScale} referentialScale Referential scale to get the steps for
     * @returns {number[]} Array of intervals for the inputted referential scale in half steps
     * @contributors Nolan
     */
    function getIntervals(referentialScale) {
        return PROPERTIES[referentialScale].steps;
    }

    /**
     * List of {@link ReferentialScale}s supported by getter methods, such as {@link ReferentialScale.getIntervals}.
     * @type ReferentialScale[]
     * @readonly
     */
    const SUPPORTED_SCALES = Object.freeze(Object.keys(PROPERTIES).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        getIntervals,
        SUPPORTED_SCALES
    })
})();

export default ReferentialScale;