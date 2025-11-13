// note: numbers are of ascending pitch class
// a difference of one means one half step
const PITCH_CLASS = Object.freeze({
    C:       0,
    C_SHARP: 1,
    D_FLAT:  1,
    D:       2,
    D_SHARP: 3,
    E_FLAT:  3,
    E:       4,
    F_FLAT:  4,
    E_SHARP: 5,
    F:       5,
    F_SHARP: 6,
    G_FLAT:  6,
    G:       7,
    G_SHARP: 8,
    A_FLAT:  8,
    A:       9,
    A_SHARP: 10,
    B_FLAT:  10,
    B:       11,
});

const PITCH_CLASS_REPRESENTATION_TYPE = Object.freeze({
    NATURAL: 0,
    SHARP:   1,
    FLAT:    2
})

const PitchClassMap = Object.freeze({
    [PITCH_CLASS.C]: {
        basePitch: 261.63,
        representations: [
            { symbol: "B#", name: "B sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "C",  name: "C",       type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL },
        ]
    },

    [PITCH_CLASS.C_SHARP]: {
        basePitch: 277.18,
        representations: [
            { symbol: "C#", name: "C sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "Db", name: "D flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT },
        ]
    },

    [PITCH_CLASS.D]: {
        basePitch: 293.66,
        representations: [
            { symbol: "D",  name: "D",       type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL },
        ]
    },

    [PITCH_CLASS.D_SHARP]: {
        basePitch: 311.13,
        representations: [
            { symbol: "D#", name: "D sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "Eb", name: "E flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT },
        ]
    },

    [PITCH_CLASS.E]: {
        basePitch: 329.63,
        representations: [
            { symbol: "E",  name: "E",       type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL },
            { symbol: "Fb", name: "F flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT },
        ]
    },

    [PITCH_CLASS.F]: {
        basePitch: 349.23,
        representations: [
            { symbol: "E#", name: "E sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "F",  name: "F",       type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL },
        ]
    },

    [PITCH_CLASS.F_SHARP]: {
        basePitch: 329.99,
        representations: [
            { symbol: "F#", name: "F sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "Gb", name: "G flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT }
        ]
    },
    
    [PITCH_CLASS.G]: {
        basePitch: 392,
        representations: [
            { symbol: "G", name: "G", type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL }
        ]
    },

    [PITCH_CLASS.G_SHARP]: {
        basePitch: 415.3,
        representations: [
            { symbol: "G#", name: "G sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "Ab", name: "A flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT }
        ]
    },

    [PITCH_CLASS.A]: {
        basePitch: 440,
        representations: [
            { symbol: "A",  name: "A",       type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL },
        ]
    },

    [PITCH_CLASS.A_SHARP]: {
        basePitch: 466.16,
        representations: [
            { symbol: "A#", name: "A sharp", type: PITCH_CLASS_REPRESENTATION_TYPE.SHARP },
            { symbol: "Bb", name: "B flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT },
        ]
    },

    [PITCH_CLASS.B]: {
        basePitch: 492.88,
        representations: [
            { symbol: "B",  name: "B",       type: PITCH_CLASS_REPRESENTATION_TYPE.NATURAL },
            { symbol: "Cb", name: "C flat",  type: PITCH_CLASS_REPRESENTATION_TYPE.FLAT },
        ]
    },

});

const NUM_PITCH_CLASSES = Object.keys(IntervalMap).length;
const PITCH_CLASS_BASE_OCTAVE = 4
const MIN_INTERVAL = 0;
const MAX_INTERVAL = 11;

module.exports = {
    PITCH_CLASS,
    PitchClassMap,
    PITCH_CLASS_REPRESENTATION_TYPE,
    NUM_PITCH_CLASSES,
    PITCH_CLASS_BASE_OCTAVE,
    MIN_INTERVAL,
    MAX_INTERVAL
};