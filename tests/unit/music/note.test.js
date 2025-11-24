import Note from "../../../src/public/scripts/music/note.js";
import { PitchClass } from "../../../src/public/scripts/music/enums";

/* ================================================= helpers ================================================= */

const expectNoteToBe = (note, pitchClass, octave, pitch) => {
    expect(note.getPitchClass()).toBe(pitchClass);
    expect(note.getOctave()).toBe(octave);
    expect(note.getPitch()).toBe(pitch);
}

/* ================================================= constructor ================================================= */

describe("Note.constructor", () => {
    test("Create a Note instance by only assigning a pitch class", () => {
        const pitchClass = PitchClass.F_SHARP;
        const EXPECTED_PITCH = 369.99; // DO NOT use the PitchClass API

        const note = new Note(pitchClass);
        expectNoteToBe(note, pitchClass, Note.DEFAULT_OCTAVE, EXPECTED_PITCH);
    });

    test("Create a Note instance by assigning both a pitch class and octave", () => {
        const PITCH_CLASS = PitchClass.F_SHARP;
        const OCTAVE = Note.DEFAULT_OCTAVE + 1;
        const EXPECTED_PITCH = 369.99 * 2; // DO NOT use the PitchClass API

        const note = new Note(PITCH_CLASS, OCTAVE);
        expectNoteToBe(note, PITCH_CLASS, OCTAVE, EXPECTED_PITCH);
    });
})

/* ================================================= transposeTo ================================================= */

describe("Note.prototype.transposeTo", () => {
    const ORIGINAL_PITCH_CLASS = PitchClass.F_SHARP;
    const ORIGINAL_OCTAVE = Note.DEFAULT_OCTAVE;
    const ORIGINAL_PITCH = 369.99;

    let note;

    beforeEach(() => {
        note = new Note(ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE);
    });

    test("Transposing to the same pitch class and octave", () => {
        note.transposeTo(ORIGINAL_PITCH_CLASS);
        expectNoteToBe(note, ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE, ORIGINAL_PITCH);
    })

    test("Transposing to a higher pitch class without specifying an octave", () => {
        note.transposeTo(PitchClass.A);
        expectNoteToBe(note, PitchClass.A, ORIGINAL_OCTAVE, 440);
    });

    test("Transposing to a lower pitch class without specifying an octave", () => {
        note.transposeTo(PitchClass.E_FLAT);
        expectNoteToBe(note, PitchClass.E_FLAT, ORIGINAL_OCTAVE, 311.13);
    });

    test("Transposing to a higher octave with the same pitch class", () => {
        note.transposeTo(ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE + 1);
        expectNoteToBe(note, ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE + 1, ORIGINAL_PITCH * 2);
    });

    test("Transposing to a lower octave with the same pitch class", () => {
        note.transposeTo(ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE - 1);
        expectNoteToBe(note, ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE - 1, ORIGINAL_PITCH / 2);
    });

    test("Transposing to a lower pitch class and lower octave", () => {
        note.transposeTo(PitchClass.C, ORIGINAL_OCTAVE - 1);
        expectNoteToBe(note, PitchClass.C, ORIGINAL_OCTAVE - 1, 261.63 / 2);
    });

    test("Transposing to a higher pitch class and lower octave", () => {
        note.transposeTo(PitchClass.B, ORIGINAL_OCTAVE - 1);
        expectNoteToBe(note, PitchClass.B, ORIGINAL_OCTAVE - 1, 493.88 / 2);
    });

    test("Transposing to a lower pitch class and higher octave", () => {
        note.transposeTo(PitchClass.D, ORIGINAL_OCTAVE + 1);
        expectNoteToBe(note, PitchClass.D, ORIGINAL_OCTAVE + 1, 293.66 * 2);
    });

    test("Transposing to a higher pitch class and higher octave", () => {
        note.transposeTo(PitchClass.A_FLAT, ORIGINAL_OCTAVE + 1);
        expectNoteToBe(note, PitchClass.A_FLAT, ORIGINAL_OCTAVE + 1, 415.3 * 2);
    });
});

/* ================================================= transposeBy ================================================= */

describe("Note.prototype.transposeBy", () => {
    const ORIGINAL_PITCH_CLASS = PitchClass.F_SHARP;
    const ORIGINAL_OCTAVE = Note.DEFAULT_OCTAVE;
    const ORIGINAL_PITCH = 369.99;

    let note;

    beforeEach(() => {
        note = new Note(ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE);
    });

    test("Transposing zero half steps", () => {
        note.transposeBy(0);
        expectNoteToBe(note, ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE, ORIGINAL_PITCH);
    });

    test("Transposing up within the same octave", () => {
        note.transposeBy(3);
        expectNoteToBe(note, PitchClass.A, ORIGINAL_OCTAVE, 440);
    });

    test("Transposing down within the same octave", () => {
        note.transposeBy(-3);
        expectNoteToBe(note, PitchClass.E_FLAT, ORIGINAL_OCTAVE, 311.13);
    });

    test("Transposing exactly one octave up", () => {
        note.transposeBy(12);
        expectNoteToBe(note, ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE + 1, ORIGINAL_PITCH * 2);
    });

    test("Transposing exactly one octave down", () => {
        note.transposeBy(-12);
        expectNoteToBe(note, ORIGINAL_PITCH_CLASS, ORIGINAL_OCTAVE - 1, ORIGINAL_PITCH / 2);
    });

    test("Transposing more than one octave up", () => {
        note.transposeBy(27);
        expectNoteToBe(note, PitchClass.A, ORIGINAL_OCTAVE + 2, 1760);
    });

    test("Transposing more than one octave down", () => {
        note.transposeBy(-27);
        expectNoteToBe(note, PitchClass.E_FLAT, ORIGINAL_OCTAVE - 2, 311.13 / 4);
    });
});