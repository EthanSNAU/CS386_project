import Scale from "../../src/public/scripts/music/scale.js";
import Chord from "../../src/public/scripts/music/chord.js";
import ChordRepresentationObserver from "../../src/public/scripts/music/chordRepresentationObserver.js";
import { Accidental, PitchClass, ReferentialScale } from "../../src/public/scripts/music/enums";

describe("Getting chord representations", () => {
    test("Immediately after construction", () => {
        const scale = new Scale(PitchClass.C, ReferentialScale.IONIAN_MAJOR);
        const chord = new Chord(PitchClass.F);
        const observer = new ChordRepresentationObserver(scale);

        chord.addRepresentationObserver(observer);

        const expectedRepresentation = {
            alphabetical: {
                name:        "F major",
                symbol:      "F",
                accidental:  Accidental.NATURAL,
                lowerFigure: "",
                upperFigure: "",
                bassFigure:  ""
            },
            roman: {
                name:        "four major",
                symbol:      "IV",
                accidental:  Accidental.NATURAL,
                lowerFigure: "",
                upperFigure: "",
                bassFigure:  ""
            }
        };

        expect(chord.getRepresentation()).toEqual(expectedRepresentation);
    });
});