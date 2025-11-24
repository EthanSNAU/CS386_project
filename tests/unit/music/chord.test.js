import { jest } from "@jest/globals";

jest.unstable_mockModule(
    "../../../src/public/scripts/music/chordRepresentationObserver.js",
    () => ({
        default: jest.fn().mockImplementation(() => ({
            notify: jest.fn()
        }))
    })
);

const { default: ChordRepresentationObserver } = await import("../../../src/public/scripts/music/chordRepresentationObserver.js");

import Chord from "../../../src/public/scripts/music/chord.js";
import Note from "../../../src/public/scripts/music/note.js";
import { ChordQuality, ChordPlaybackStyle, PitchClass } from "../../../src/public/scripts/music/enums";

/* ================================================= helpers ================================================= */

// TODO: fix the observer tests

const expectChordToBe = (chord, notes, playbackStyle, intervals) => {
    const numNotes = notes.length;

    for (let i = 0; i < numNotes; i++) {
        const note = notes[i];
        expect(chord.getPitchClassAt(i)).toBe(note.pitchClass);
        expect(chord.getOctaveAt(i)).toBe(note.octave);
    }

    expect(chord.getNumNotes()).toBe(numNotes);
    expect(chord.getPlaybackStyle()).toBe(playbackStyle);
    expect(chord.getIntervals()).toEqual(intervals)
}

/* ================================================= constructor ================================================= */

// Note: The Note class IS NOT MOCKED because Chord instances only produce meaningful results when Note instances exist
// TODO: check that observers are notified

describe("Chord.constructor", () => {
    test("Creating a Chord instance by only giving a pitch class", () => {
        const chord = new Chord(PitchClass.E_FLAT);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.E_FLAT, octave: Chord.DEFAULT_OCTAVE },
            { pitchClass: PitchClass.G,      octave: Chord.DEFAULT_OCTAVE },
            { pitchClass: PitchClass.B_FLAT, octave: Chord.DEFAULT_OCTAVE },
        ];

        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3]);
    });

    test("Creating a Chord instance by giving a pitch class and octave", () => {
        const OCTAVE = 5;
        const chord = new Chord(PitchClass.B, OCTAVE);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.B,       octave: OCTAVE     },
            { pitchClass: PitchClass.D_SHARP, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.F_SHARP, octave: OCTAVE + 1 },
        ];

        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3]);
    });

    test("Creating a Chord instance by giving a pitch class, octave, and quality", () => {
        const OCTAVE = 3;
        const QUALITY = ChordQuality.MAJOR_MINOR_SEVEN;
        const chord = new Chord(PitchClass.G, OCTAVE, QUALITY);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.G, octave: OCTAVE     },
            { pitchClass: PitchClass.B, octave: OCTAVE     },
            { pitchClass: PitchClass.D, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.F, octave: OCTAVE + 1 },
        ];

        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3, 3]);
    });

    test("Creating a Chord instance by giving a pitch class, octave, quality, and inversion", () => {
        const OCTAVE = 6;
        const QUALITY = ChordQuality.SUSPENDED_FOUR;
        const INVERSION = 1;
        const chord = new Chord(PitchClass.A_FLAT, OCTAVE, QUALITY, INVERSION);


        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.D_FLAT, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.E_FLAT, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.A_FLAT, octave: OCTAVE + 1 },
        ];

        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [2, 5]);
    });

    test("Creating a Chord instance by giving a pitch class, octave, quality, inversion, and playback style", () => {
        const OCTAVE = 4;
        const QUALITY = ChordQuality.HALF_DIMINISHED_SEVEN;
        const INVERSION = 3;
        const PLAYBACK_STYLE = ChordPlaybackStyle.ARPEGGIO_UP;
        const chord = new Chord(PitchClass.C_SHARP, OCTAVE, QUALITY, INVERSION, PLAYBACK_STYLE);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.B,       octave: OCTAVE     },
            { pitchClass: PitchClass.C_SHARP, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.E,       octave: OCTAVE + 1 },
            { pitchClass: PitchClass.G,       octave: OCTAVE + 1 },
        ];

        expectChordToBe(chord, EXPECTED_NOTES, PLAYBACK_STYLE, [2, 3, 3]);
    });

    test("Creating a Chord instance by giving a pitch class, octave, quality, inversion, playback style, and note factory", () => {
        const OCTAVE = 2;
        const QUALITY = ChordQuality.MAJOR_MAJOR_SEVEN;
        const INVERSION = 2;
        const PLAYBACK_STYLE = ChordPlaybackStyle.ARPEGGIO_DOWN;
        const factory = (pitchClass, octave) => { return new Note(pitchClass, octave + 1) }
        const chord = new Chord(PitchClass.D, OCTAVE, QUALITY, INVERSION, PLAYBACK_STYLE, factory);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.A,       octave: OCTAVE + 1 },
            { pitchClass: PitchClass.C_SHARP, octave: OCTAVE + 2 },
            { pitchClass: PitchClass.D,       octave: OCTAVE + 2 },
            { pitchClass: PitchClass.F_SHARP, octave: OCTAVE + 2 },
        ];

        expectChordToBe(chord, EXPECTED_NOTES, PLAYBACK_STYLE, [4, 1, 4]);
    });
});

/* ================================================= tranposeTo ================================================= */

describe("Chord.prototype.transposeTo", () => {
    const ORIGINAL_PITCH_CLASS = PitchClass.F;
    const ORIGINAL_OCTAVE = 5;
    const ORIGINAL_INTERVALS = [4, 3];

    let chord;
    let representationObserver;
    beforeEach(() => {
        chord = new Chord(ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE);
        representationObserver = new ChordRepresentationObserver();
        chord.addRepresentationObserver(representationObserver);
    });

    test("Transposing a chord to the same position", () => {
        chord.transposeTo(ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.F, octave: ORIGINAL_OCTAVE     },
            { pitchClass: PitchClass.A, octave: ORIGINAL_OCTAVE     },
            { pitchClass: PitchClass.C, octave: ORIGINAL_OCTAVE + 1 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing a chord up within the same octave", () => {
        chord.transposeTo(PitchClass.B_FLAT, ORIGINAL_OCTAVE);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.B_FLAT, octave: ORIGINAL_OCTAVE     },
            { pitchClass: PitchClass.D,      octave: ORIGINAL_OCTAVE + 1 },
            { pitchClass: PitchClass.F,      octave: ORIGINAL_OCTAVE + 1 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing a chord down within the same octave", () => {
        chord.transposeTo(PitchClass.C, ORIGINAL_OCTAVE);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.C, octave: ORIGINAL_OCTAVE },
            { pitchClass: PitchClass.E, octave: ORIGINAL_OCTAVE },
            { pitchClass: PitchClass.G, octave: ORIGINAL_OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing to a lower pitch class and lower octave", () => {
        chord.transposeTo(PitchClass.D_SHARP, ORIGINAL_OCTAVE - 2);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.D_SHARP, octave: ORIGINAL_OCTAVE - 2 },
            { pitchClass: PitchClass.G,       octave: ORIGINAL_OCTAVE - 2 },
            { pitchClass: PitchClass.A_SHARP, octave: ORIGINAL_OCTAVE - 2 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing to a higher pitch class and higher octave", () => {
        chord.transposeTo(PitchClass.A, ORIGINAL_OCTAVE + 2);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.A,       octave: ORIGINAL_OCTAVE + 2 },
            { pitchClass: PitchClass.C_SHARP, octave: ORIGINAL_OCTAVE + 3 },
            { pitchClass: PitchClass.E,       octave: ORIGINAL_OCTAVE + 3 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });
});

/* ================================================= tranposeBy ================================================= */

describe("Chord.prototype.transposeBy", () => {
    const ORIGINAL_PITCH_CLASS = PitchClass.F;
    const ORIGINAL_OCTAVE = 5;
    const ORIGINAL_NUM_NOTES = 3;
    const ORIGINAL_INTERVALS = [4, 3];

    let chord;
    let representationObserver;
    beforeEach(() => {
        chord = new Chord(ORIGINAL_PITCH_CLASS, 5);
        representationObserver = new ChordRepresentationObserver();
    });

    test("Transposing a chord zero half steps", () => {
        chord.transposeBy(0);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.F, octave: ORIGINAL_OCTAVE     },
            { pitchClass: PitchClass.A, octave: ORIGINAL_OCTAVE     },
            { pitchClass: PitchClass.C, octave: ORIGINAL_OCTAVE + 1 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing a chord up within the same octave", () => {
        chord.transposeBy(5);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.B_FLAT, octave: ORIGINAL_OCTAVE     },
            { pitchClass: PitchClass.D,      octave: ORIGINAL_OCTAVE + 1 },
            { pitchClass: PitchClass.F,      octave: ORIGINAL_OCTAVE + 1 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing a chord down within the same octave", () => {
        chord.transposeBy(-5);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.C, octave: ORIGINAL_OCTAVE },
            { pitchClass: PitchClass.E, octave: ORIGINAL_OCTAVE },
            { pitchClass: PitchClass.G, octave: ORIGINAL_OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing to a lower pitch class and lower octave", () => {
        chord.transposeBy(-26);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.D_SHARP, octave: ORIGINAL_OCTAVE - 2 },
            { pitchClass: PitchClass.G,       octave: ORIGINAL_OCTAVE - 2 },
            { pitchClass: PitchClass.A_SHARP, octave: ORIGINAL_OCTAVE - 2 },
        ]

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });

    test("Transposing to a higher pitch class and higher octave", () => {
        chord.transposeBy(28);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.A,       octave: ORIGINAL_OCTAVE + 2 },
            { pitchClass: PitchClass.C_SHARP, octave: ORIGINAL_OCTAVE + 3 },
            { pitchClass: PitchClass.E,       octave: ORIGINAL_OCTAVE + 3 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, ORIGINAL_INTERVALS);
    });
});

/* ================================================= tranposeBy ================================================= */

describe("Chord.prototype.setQuality", () => {
    let chord;
    let representationObserver;

    const resetChord = (pitchClass, octave, quality) => {
        chord = new Chord(pitchClass, octave, quality);
        representationObserver = new ChordRepresentationObserver();
        chord.addRepresentationObserver(representationObserver);
    };

    test("Setting quality its current quality", () => {
        const OCTAVE = 4;
        const QUALITY = ChordQuality.MAJOR_TRIAD;
        resetChord(PitchClass.E, OCTAVE, QUALITY);
        chord.setQuality(QUALITY);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.E      , octave: OCTAVE },
            { pitchClass: PitchClass.G_SHARP, octave: OCTAVE },
            { pitchClass: PitchClass.B      , octave: OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3]);
    });

    test("Changing a triad to a different triad", () => {
        const OCTAVE = 1;
        resetChord(PitchClass.B, OCTAVE, ChordQuality.MINOR_TRIAD);
        chord.setQuality(ChordQuality.AUGMENTED_TRIAD);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.B,       octave: OCTAVE     },
            { pitchClass: PitchClass.D_SHARP, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.G,       octave: OCTAVE + 1 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 4]);
    });

    test("Changing a triad to a seventh chord", () => {
        const OCTAVE = 5;
        resetChord(PitchClass.G_FLAT, OCTAVE, ChordQuality.DIMINISHED_TRIAD);
        chord.setQuality(ChordQuality.MAJOR_MAJOR_SEVEN);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.G_FLAT, octave: OCTAVE     },
            { pitchClass: PitchClass.B_FLAT, octave: OCTAVE     },
            { pitchClass: PitchClass.D_FLAT, octave: OCTAVE + 1 },
            { pitchClass: PitchClass.F,      octave: OCTAVE + 1 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3, 4]);
    });

    test("Changing a seventh chord to a triad", () => {
        const OCTAVE = 8;
        resetChord(PitchClass.D, OCTAVE, ChordQuality.DIMINISHED_SEVEN);
        chord.setQuality(ChordQuality.MAJOR_TRIAD);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.D,       octave: OCTAVE },
            { pitchClass: PitchClass.F_SHARP, octave: OCTAVE },
            { pitchClass: PitchClass.A,       octave: OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3]);
    });

    test("Changing a seventh chord to a different seventh chord", () => {
        const OCTAVE = 6;
        resetChord(PitchClass.C, OCTAVE, ChordQuality.MINOR_MAJOR_SEVEN);
        chord.setQuality(ChordQuality.MAJOR_MINOR_SEVEN);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.C,      octave: OCTAVE },
            { pitchClass: PitchClass.E,      octave: OCTAVE },
            { pitchClass: PitchClass.G,      octave: OCTAVE },
            { pitchClass: PitchClass.B_FLAT, octave: OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3, 3]);
    });
});

/* ================================================= invert ================================================= */

describe("Chord.prototype.invert", () => {
    let chord;
    let representationObserver;

    const resetChord = (pitchClass, octave, quality) => {
        chord = new Chord(pitchClass, octave, quality);
        representationObserver = new ChordRepresentationObserver();
        chord.addRepresentationObserver(representationObserver);
    };

    test("Inverting a chord zero times", () => {
        const OCTAVE = 4;
        resetChord(PitchClass.C_SHARP, OCTAVE, ChordQuality.MAJOR_TRIAD);
        chord.invert(0);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.C_SHARP, octave: OCTAVE },
            { pitchClass: PitchClass.F,       octave: OCTAVE },
            { pitchClass: PitchClass.G_SHARP, octave: OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 3]);
    });

    test("Inverting a chord up within one octave", () => {
        const OCTAVE = 3
        resetChord(PitchClass.A, OCTAVE, ChordQuality.MAJOR_TRIAD);
        chord.invert(2);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.E,       octave: OCTAVE + 1 },
            { pitchClass: PitchClass.A,       octave: OCTAVE + 1 },
            { pitchClass: PitchClass.C_SHARP, octave: OCTAVE + 2 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [5, 4]);
    });

    test("Inverting a chord down within one octave", () => {
        const OCTAVE = 5
        resetChord(PitchClass.A, OCTAVE, ChordQuality.MAJOR_TRIAD);
        chord.invert(-2);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.C_SHARP, octave: OCTAVE },
            { pitchClass: PitchClass.E,       octave: OCTAVE },
            { pitchClass: PitchClass.A,       octave: OCTAVE },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [3, 5]);
    });

    test("Inverting a chord up more than one octave", () => {
        const OCTAVE = 5
        resetChord(PitchClass.E, OCTAVE, ChordQuality.MINOR_TRIAD);
        chord.invert(8);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.B, octave: OCTAVE + 2 },
            { pitchClass: PitchClass.E, octave: OCTAVE + 3 },
            { pitchClass: PitchClass.G, octave: OCTAVE + 3 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [5, 3]);
    });

    test("Inverting a chord down more than one octave", () => {
        const OCTAVE = 5
        resetChord(PitchClass.E, OCTAVE, ChordQuality.MINOR_TRIAD);
        chord.invert(-8);

        const EXPECTED_NOTES = [
            { pitchClass: PitchClass.G, octave: OCTAVE - 3 },
            { pitchClass: PitchClass.B, octave: OCTAVE - 3 },
            { pitchClass: PitchClass.E, octave: OCTAVE - 2 },
        ];

        // expect(representationObserver.notify).toHaveBeenCalledTimes(1);
        expectChordToBe(chord, EXPECTED_NOTES, Chord.DEFAULT_PLAYBACK_STYLE, [4, 5]);
    });
});