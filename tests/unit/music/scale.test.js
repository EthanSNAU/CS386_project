import Scale from "../../../src/public/scripts/music/scale.js";
import { PitchClass, Accidental, ReferentialScale } from "../../../src/public/scripts/music/enums";

/* ================================================= helpers ================================================= */

const A_MAJOR_OCTAVE = {
    [PitchClass.A]: {
        roman: {
            name: "one",
            symbol: "I",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "A",
            symbol: "A",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.A_SHARP]: {
        roman: {
            name: "sharp one",
            symbol: "#I",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "A sharp",
            symbol: "A#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.B]: {
        roman: {
            name: "two",
            symbol: "II",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "B",
            symbol: "B",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.C]: {
        roman: {
            name: "sharp two",
            symbol: "#II",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "C",
            symbol: "C",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.C_SHARP]: {
        roman: {
            name: "three",
            symbol: "III",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "C sharp",
            symbol: "C#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.D]: {
        roman: {
            name: "four",
            symbol: "IV",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "D",
            symbol: "D",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.D_SHARP]: {
        roman: {
            name: "sharp four",
            symbol: "#IV",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "D sharp",
            symbol: "D#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.E]: {
        roman: {
            name: "five",
            symbol: "V",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "E",
            symbol: "E",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.F]: {
        roman: {
            name: "sharp five",
            symbol: "#V",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "F",
            symbol: "F",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.F_SHARP]: {
        roman: {
            name: "six",
            symbol: "VI",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "F#",
            symbol: "F#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.G]: {
        roman: {
            name: "sharp six",
            symbol: "#VI",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "G",
            symbol: "G",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.G_SHARP]: {
        roman: {
            name: "seven",
            symbol: "VII",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "G sharp",
            symbol: "G#",
            accidental: Accidental.SHARP
        }
    },
};

const A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES = [
    PitchClass.A, PitchClass.B, PitchClass.C_SHARP, PitchClass.D, PitchClass.E, PitchClass.F_SHARP,
    PitchClass.G_SHARP
];

const A_NATURAL_MINOR_OCTAVE = {
    [PitchClass.A]: {
        roman: {
            name: "one",
            symbol: "I",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "A",
            symbol: "A",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.A_SHARP]: {
        roman: {
            name: "sharp one",
            symbol: "#I",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "A sharp",
            symbol: "A#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.B]: {
        roman: {
            name: "two",
            symbol: "II",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "B",
            symbol: "B",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.C]: {
        roman: {
            name: "three",
            symbol: "III",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "C",
            symbol: "C",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.C_SHARP]: {
        roman: {
            name: "sharp three",
            symbol: "#III",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "C sharp",
            symbol: "C#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.D]: {
        roman: {
            name: "four",
            symbol: "IV",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "D",
            symbol: "D",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.D_SHARP]: {
        roman: {
            name: "sharp four",
            symbol: "#IV",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "D sharp",
            symbol: "D#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.E]: {
        roman: {
            name: "five",
            symbol: "V",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "E",
            symbol: "E",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.F]: {
        roman: {
            name: "six",
            symbol: "VI",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "F",
            symbol: "F",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.F_SHARP]: {
        roman: {
            name: "sharp six",
            symbol: "#VI",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "F#",
            symbol: "F#",
            accidental: Accidental.SHARP
        }
    },

    [PitchClass.G]: {
        roman: {
            name: "seven",
            symbol: "VII",
            accidental: Accidental.NATURAL
        },
        alphabetical: {
            name: "G",
            symbol: "G",
            accidental: Accidental.NATURAL
        }
    },

    [PitchClass.G_SHARP]: {
        roman: {
            name: "sharp seven",
            symbol: "#VII",
            accidental: Accidental.SHARP
        },
        alphabetical: {
            name: "G sharp",
            symbol: "G#",
            accidental: Accidental.SHARP
        }
    },
};


const A_NATURAL_MINOR_REFERENTIAL_SCALE_PITCH_CLASSES = [
    PitchClass.A, PitchClass.B, PitchClass.C, PitchClass.D, PitchClass.E, PitchClass.F,
    PitchClass.G
]

const expectScaleOctaveToBeEqual = (scale, expectedOctave) => {
    for (const pitchClass of Object.keys(expectedOctave)) {
        const representation = scale.getRepresentation(parseInt(pitchClass));
        expect(representation).toStrictEqual(expectedOctave[pitchClass]);
    }
}

const expectScaleToBe = (scale, expectedReferentialScale, expectedReferentialScalePitchClasses, expectedOctave) => {
    expect(scale.getReferentialScale()).toBe(expectedReferentialScale);
    expect(scale.getReferentialScalePitchClasses()).toEqual(expectedReferentialScalePitchClasses);
    expectScaleOctaveToBeEqual(scale, expectedOctave);
}

/* ================================================= constructor ================================================= */

describe("Scale.constructor", () => {
    test("Create a Scale instance by only assigning a root pitch class", () => {
        const scale = new Scale(PitchClass.A);
        expectScaleToBe(
            scale, Scale.DEFAULT_REFERENTIAL_SCALE, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });

    test("Create a Scale instance by assigning both a root pitch class and referential scale", () => {
        const scale = new Scale(PitchClass.A, ReferentialScale.IONIAN_NATURAL_MINOR);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_NATURAL_MINOR, A_NATURAL_MINOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_NATURAL_MINOR_OCTAVE
        );
    })
});

/* ================================================= setReferentialScale ================================================= */

describe("Scale.prototype.setReferentialScale", () => {
    let scale;

    beforeEach(() => {
        scale = new Scale(PitchClass.A, ReferentialScale.IONIAN_MAJOR);
    });

    test("Setting the referential scale to the current referential scale", () => {
        scale.setReferentialScale(ReferentialScale.IONIAN_MAJOR);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });

    test("Setting the referential scale to something different", () => {
        scale.setReferentialScale(ReferentialScale.IONIAN_NATURAL_MINOR);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_NATURAL_MINOR, A_NATURAL_MINOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_NATURAL_MINOR_OCTAVE
        );
    });
});

/* ================================================= transposeTo ================================================= */

describe("Scale.prototype.transposeTo", () => {
    test("Transposing to the same root note", () => {
        const scale = new Scale(PitchClass.A, ReferentialScale.IONIAN_MAJOR);
        scale.transposeTo(PitchClass.A);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });

    test("Transposing up", () => {
        const scale = new Scale(PitchClass.F, ReferentialScale.IONIAN_MAJOR);
        scale.transposeTo(PitchClass.A);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    })

    test("Transposing down", () => {
        const scale = new Scale(PitchClass.B, ReferentialScale.IONIAN_MAJOR);
        scale.transposeTo(PitchClass.A);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    })
});

/* ================================================= transposeBy ================================================= */

describe("Scale.prototype.transposeBy", () => {
    test("Transposing zero half steps", () => {
        const scale = new Scale(PitchClass.A, ReferentialScale.IONIAN_MAJOR);
        scale.transposeBy(0);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });

    test("Transposing up in the same octave", () => {
        const scale = new Scale(PitchClass.F, ReferentialScale.IONIAN_MAJOR);
        scale.transposeBy(4);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });

    test("Transposing down in the same octave", () => {
        const scale = new Scale(PitchClass.B, ReferentialScale.IONIAN_MAJOR);
        scale.transposeBy(-2);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });
    
    test("Transposing up to a different octave", () => {
        const scale = new Scale(PitchClass.F, ReferentialScale.IONIAN_MAJOR);
        scale.transposeBy(28);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });

    test("Transposing down to a different octave", () => {
        const scale = new Scale(PitchClass.B, ReferentialScale.IONIAN_MAJOR);
        scale.transposeBy(-26);
        expectScaleToBe(
            scale, ReferentialScale.IONIAN_MAJOR, A_MAJOR_REFERENTIAL_SCALE_PITCH_CLASSES,
            A_MAJOR_OCTAVE
        );
    });
});