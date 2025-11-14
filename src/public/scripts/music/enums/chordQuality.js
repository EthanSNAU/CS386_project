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
    [ChordQuality.MAJOR]:           { steps: [4, 3],    centerSymbolDescriptors: "",     upperSymbolDescriptors: "",     name: "major",           isLowercase: false },
    [ChordQuality.MINOR]:           { steps: [3, 4],    centerSymbolDescriptors: "m",    upperSymbolDescriptors: "",     name: "minor",           isLowercase: true  },
    [ChordQuality.DIMINISHED]:      { steps: [3, 3],    centerSymbolDescriptors: "dim",  upperSymbolDescriptors: "",     name: "diminished",      isLowercase: true  },
    [ChordQuality.AUGMENTED]:       { steps: [4, 4],    centerSymbolDescriptors: "aug",  upperSymbolDescriptors: "",     name: "augmented",       isLowercase: false },
    [ChordQuality.SUSPENDED_TWO]:   { steps: [2, 5],    centerSymbolDescriptors: "",     upperSymbolDescriptors: "sus2", name: "suspended two",   isLowercase: false },
    [ChordQuality.SUSPENDED_FOUR]:  { steps: [5, 2],    centerSymbolDescriptors: "",     upperSymbolDescriptors: "sus4", name: "suspended four",  isLowercase: false },
    [ChordQuality.DOMINANT_SEVEN]:  { steps: [4, 3, 3], centerSymbolDescriptors: "",     upperSymbolDescriptors: "7",    name: "dominant seven",  isLowercase: false },
    [ChordQuality.HALF_DIMINISHED]: { steps: [3, 3, 4], centerSymbolDescriptors: "m",    upperSymbolDescriptors: "7b5",  name: "half diminished", isLowercase: true  },
})

export const ALL_SUPPORTED_CHORD_QUALITIES = Object.freeze(Object.keys(ChordQualityMap));

export function getChordQualitySteps(quality) {
    return ChordQualityMap[quality].steps;
}

export function getChordQualityRepresentation(quality) {
    const info = ChordQualityMap[quality];
    return {
        centerSymbolDescriptors: info.centerSymbolDescriptors,
        upperSymbolDescriptors:  info.upperSymbolDescriptors,
        name:              info.name,
        isLowercase:       info.isLowercase
    };
}