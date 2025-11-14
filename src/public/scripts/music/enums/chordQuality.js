export const ChordQuality = Object.freeze({
    MAJOR:           0,
    MINOR:           1,
    DIMINISHED:      2,
    AUGMENTED:       3,
    SUSPENDED_TWO:   4,
    SUSPENDED_FOUR:  5,
    DOMINANT_SEVEN:  6,
    HALF_DIMINISHED: 7
});

// "steps" are in half steps
const ChordQualityMap = Object.freeze({
    [ChordQuality.MAJOR]:           { steps: [4, 3],    symbol: "",     name: "major",           isLowercase: false },
    [ChordQuality.MINOR]:           { steps: [3, 4],    symbol: "m",    name: "minor",           isLowercase: true  },
    [ChordQuality.DIMINISHED]:      { steps: [3, 3],    symbol: "dim",  name: "diminished",      isLowercase: true  },
    [ChordQuality.AUGMENTED]:       { steps: [4, 4],    symbol: "aug",  name: "augmented",       isLowercase: false },
    [ChordQuality.SUSPENDED_TWO]:   { steps: [2, 5],    symbol: "sus2", name: "suspended two",   isLowercase: false },
    [ChordQuality.SUSPENDED_FOUR]:  { steps: [5, 2],    symbol: "sus4", name: "suspended four",  isLowercase: false },
    [ChordQuality.DOMINANT_SEVEN]:  { steps: [4, 3, 3], symbol: "7",    name: "dominant seven",  isLowercase: false },
    [ChordQuality.HALF_DIMINISHED]: { steps: [3, 3, 4], symbol: "m7b5", name: "half diminished", isLowercase: true  },
})

export const ALL_SUPPORTED_CHORD_QUALITIES = Object.freeze(Object.keys(ChordQualityMap));

export function getChordQualitySteps(quality) {
    return ChordQualityMap[quality].steps;
}

export function getChordQualityRepresentation(quality) {
    const info = ChordQualityMap[quality];
    return {
        symbol:      info.symbol,
        name:        info.name,
        isLowercase: info.isLowercase
    };
}