export const ReferentialScale = Object.freeze({
    IONIAN_MAJOR: 0,
    IONIAN_NATURAL_MINOR: 1
    // TODO: add more
});

// "steps" refers to half steps
// the steps must be in order, so unless the constructor is changed, ionian natural minor and aeolian major are NOT the same
const ReferentialScaleMap = Object.freeze({
    [ReferentialScale.IONIAN_MAJOR]:         { steps: [2, 2, 1, 2, 2, 2] },
    [ReferentialScale.IONIAN_NATURAL_MINOR]: { steps: [2, 1, 2, 2, 1, 2] }
});

export function getReferentialScaleSteps(referentialScale) {
    return ReferentialScaleMap[referentialScale].steps;
}