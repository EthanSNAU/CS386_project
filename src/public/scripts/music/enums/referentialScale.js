/**
 * Available referential scales
 * @enum {number}
 * @readonly
 */
export const ReferentialScale = Object.freeze({
    IONIAN_MAJOR: 0,
    IONIAN_NATURAL_MINOR: 1
    // TODO: add more
});

// "steps" refers to half steps
const ReferentialScaleMap = Object.freeze({
    [ReferentialScale.IONIAN_MAJOR]:         { steps: [2, 2, 1, 2, 2, 2] },
    [ReferentialScale.IONIAN_NATURAL_MINOR]: { steps: [2, 1, 2, 2, 1, 2] }
});

/**
 * List of {@link ReferentialScale}s supported by getter methods, such as {@link getReferentialScaleSteps}.
 * @type ReferentialScale[]
 * @readonly
 */
export const ALL_SUPPORTED_REFERENTIAL_SCALES = Object.freeze(Object.keys(ReferentialScaleMap).map(str => parseInt(str)));

/**
 * Gets a referential scale's step intervals (in half steps).
 * @param {ReferentialScale} referentialScale Referential scale to get the steps for
 * @returns {number[]} Array of intervals for the inputted referential scale in half steps
 * @contributors Nolan
 */
export function getReferentialScaleSteps(referentialScale) {
    return ReferentialScaleMap[referentialScale].steps;
}