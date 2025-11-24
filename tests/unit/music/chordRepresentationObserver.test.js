import { jest } from "@jest/globals"

// jest.unstable_mockModule(
//     "../../../src/public/scripts/music/chord.js",
//     () => ({
//         default: () => jest.fn().mockImplementation(() => ({
//             getIntervals:    jest.fn(),
//             getNumNotes:     jest.fn(),
//             getPitchClassAt: jest.fn(),
//         }))
//     })
// );
// 
// const { default: Chord } = await import("../../../src/public/scripts/music/chord.js");

import ChordRepresentationObserver from "../../../src/public/scripts/music/chordRepresentationObserver";
import Scale from "../../../src/public/scripts/music/scale.js";

/* ================================================= helpers ================================================= */

// const mockChord = (chord, pitchClasses, intervals) => {
//     chord.getIntervals.mockImplementation(() => intervals);
//     chord.getPitchClassAt((index) => {
//         return pitchClasses[index];
//     });
//     chord.getNumNotes.mockImplementation(() => pitchClasses.length);
// }

/* ================================================= constructor ================================================= */

describe("ChordRepresentationObserver.constructor", () => {
    test("placeholder", () => {
        expect(true).toBe(true);
    })
});

describe("ChordRepresentationObserver.notify", () => {
    test("placeholder", () => {
        expect(true).toBe(true);
    });
});