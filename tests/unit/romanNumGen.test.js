const FILE_PATH = "../../src/public/scripts/romanNumGen.js";
const { getRandomInt, genRomanNumeral, genInversions, clearInversions, romanToWords, chordToWords, displayAlphabetProgressionAndWords, NUM_CHORDS } = require(FILE_PATH);
const iterationCount = 100;

/* ============================================= getRandomInt tests ============================================= */

describe(`getRandomInt`, () => {
    let lowerBound = 1;
    let upperBound = 20;

    const testWithinBounds = (lower, upper) => {
        for (let i = 0; i < iterationCount; i++) {
            const randInt = getRandomInt(lowerBound, upperBound);
            expect(randInt).toBeGreaterThanOrEqual(lowerBound);
            expect(randInt).toBeLessThanOrEqual(upperBound);
        }
    }

    test(`Generate integers within positive range ${lowerBound} to ${upperBound} (inclusive)`, () => {
        testWithinBounds(lowerBound, upperBound);
    });

    test(`Generate integers where lower and upper bounds are the same`, () => {
        testWithinBounds(5, 5);
    });

    lowerBound = -10;
    upperBound = 10;
    test(`Generate integers with negative lower bound ${lowerBound} to ${upperBound} (inclusive)`, () => {
        testWithinBounds(lowerBound, upperBound);
    });

    lowerBound = -20;
    upperBound = -1;
    test(`Generate integers within negative range ${lowerBound} to ${upperBound} (inclusive)`, () => {
        testWithinBounds(lowerBound, upperBound);
    });
});

/* ============================================= genRomanNumeral tests ============================================= */

describe(`genRomanNumeral`, () => {
    beforeEach(() => {
        document.body.innerHTML = "";

        for (let i = 0; i < NUM_CHORDS; i++) {
            document.body.innerHTML += `
                <p id="rootNote${i + 1}"></p>
            `;
        }
    });

    test(`Generate correct number of Roman numerals`, () => {
        const romanNumeralString = genRomanNumeral();
        expect(romanNumeralString.split(" ").length).toBe(NUM_CHORDS);
    });

    test(`Generate valid Roman numerals`, () => {
        const validRomanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "i", "ii", "iii", "iv", "v", "vi", "vii"]

        for (let i = 0; i < iterationCount; i++) {
            const romanNumeralString = genRomanNumeral();
            const romanNumerals = romanNumeralString.split(" ");
            romanNumerals.forEach(romanNumeral => {
                expect(validRomanNumerals).toContain(romanNumeral);
            });
        }
    });

    test(`Display elements update correctly`, () => {
        for (let i = 0; i < iterationCount; i++) {
            const romanNumeralString = genRomanNumeral();
            const romanNumerals = romanNumeralString.split(" ");
            for (let j = 0; j < NUM_CHORDS; j++) {
                const displayElement = document.getElementById(`rootNote${j + 1}`);
                expect(displayElement.textContent).toBe(romanNumerals[j]);
            }
        }
    });
})

/* ============================================= genInversions tests ============================================= */

describe(`genInversions`, () => {
    beforeEach(() => {
        document.body.innerHTML = "";

        for (let i = 0; i < NUM_CHORDS; i++) {
            document.body.innerHTML += `
                <p id="upperFigure${i + 1}"></p>
                <p id="lowerFigure${i + 1}"></p>
            `;
        }
    });

    test(`Generate correct number of inversions`, () => {
        const inversionsString = genInversions();
        expect(inversionsString.split(" ").length).toBe(NUM_CHORDS);
    });

    test(`Generate valid inversions`, () => {
        const validInversions = ["53", "63", "64"];

        for (let i = 0; i < iterationCount; i++) {
            const inversionsString = genInversions();
            const inversions = inversionsString.split(" ");
            inversions.forEach(inversion => {
                expect(validInversions).toContain(inversion);
            });
        }
    });

    test(`Display elements update correctly`, () => {
        for (let i = 0; i < iterationCount; i++) {
            const inversionsString = genInversions();
            const inversions = inversionsString.split(" ");
            for (let j = 0; j < NUM_CHORDS; j++) {
                const upperFigureDisplayElement = document.getElementById(`upperFigure${j + 1}`);
                const lowerFigureDisplayElement = document.getElementById(`lowerFigure${j + 1}`);
                expect(upperFigureDisplayElement.textContent).toBe(inversions[j] === "53" ? "" : inversions[j].charAt(0));
                expect(lowerFigureDisplayElement.textContent).toBe(inversions[j] === "53" ? "" : inversions[j].charAt(1));
            }
        }
    });
});

/* ============================================= clearInversions tests ============================================= */

describe(`clearInversions`, () => {
    beforeEach(() => {
        document.body.innerHTML = "";

        for (let i = 0; i < NUM_CHORDS; i++) {
            document.body.innerHTML += `
                <p id="upperFigure${i + 1}">64</p>
                <p id="lowerFigure${i + 1}">64</p>
            `;
        }
    });

    test(`Clears displayed inversions`, () => {
        clearInversions();

        for (let i = 0; i < NUM_CHORDS; i++) {
            const upperFigureDisplayElement = document.getElementById(`upperFigure${i + 1}`);
            const lowerFigureDisplayElement = document.getElementById(`lowerFigure${i + 1}`);
            expect(upperFigureDisplayElement.textContent).toBe("");
            expect(lowerFigureDisplayElement.textContent).toBe("");
        }
    });
});

/* ============================================= romanToWords tests ============================================= */

describe(`romanToWords`, () => {
    const { romanToWords } = require(FILE_PATH);

    test(`Converts uppercase Roman numerals to major chords`, () => {
        expect(romanToWords("I II III IV V VI VII")).toBe
        ("Onemajor Twomajor Threemajor Fourmajor Fivemajor Sixmajor Sevenmajor");
    });

    test(`Converts lowercase Roman numerals to minor chords`, () => {
        expect(romanToWords("i ii iii iv v vi vii")).toBe
        ("Oneminor Twominor Threeminor Fourminor Fiveminor Sixminor Sevenminor");
    });

    test(`Handles mixed case Roman numerals`, () => {
        expect(romanToWords("I ii V vi")).toBe("Onemajor Twominor Fivemajor Sixminor");
    });

    test(`Returns unknown text for invalid input`, () => {
        expect(romanToWords("X")).toBe("Xmajor");
    });
});


/* ============================================= chordToWords tests ============================================= */

describe(`chordToWords`, () => {
    const { chordToWords } = require(FILE_PATH);

    test(`Converts uppercase chords to major`, () => {
        expect(chordToWords("C")).toBe("C major");
        expect(chordToWords("G")).toBe("G major");
    });

    test(`Converts lowercase chords to minor`, () => {
        expect(chordToWords("c")).toBe("C minor");
        expect(chordToWords("a")).toBe("A minor");
    });

    test(`Recognizes extended chords`, () => {
        expect(chordToWords("Cmaj7")).toBe("C major seven");
        expect(chordToWords("G7")).toBe("G dominant seven");
    });

    test(`Returns 'Unknown chord' for invalid symbols`, () => {
        expect(chordToWords("Z")).toBe("Unknown chord");
        expect(chordToWords("")).toBe("Unknown chord");
    });
});


/* ============================================= displayAlphabetProgressionAndWords tests ============================================= */

describe(`displayAlphabetProgressionAndWords`, () => {
    const { displayAlphabetProgressionAndWords, genAlphabet } = require(FILE_PATH);

    beforeEach(() => {
        document.body.innerHTML = `
            <p id="romanDisplay"></p>
            <p id="wordDisplay"></p>
        `;
    });

    test(`Generates and displays 4 random alphabet chords`, () => {
        // Mock genAlphabet to return predictable output
        const mockProgression = "A B C D";
        jest.spyOn(global, "genAlphabet").mockReturnValue(mockProgression);

        displayAlphabetProgressionAndWords();

        const romanDisplay = document.getElementById("romanDisplay");
        const wordDisplay = document.getElementById("wordDisplay");

        expect(romanDisplay.textContent).toBe(mockProgression);
        expect(wordDisplay.textContent).toContain("A major");
        expect(wordDisplay.textContent).toContain("B major");
        expect(wordDisplay.textContent).toContain("C major");
        expect(wordDisplay.textContent).toContain("D major");

        // Restore original
        global.genAlphabet.mockRestore();
    });

    test(`Handles lowercase chords correctly`, () => {
        const mockProgression = "a b c d";
        jest.spyOn(global, "genAlphabet").mockReturnValue(mockProgression);

        displayAlphabetProgressionAndWords();

        const romanDisplay = document.getElementById("romanDisplay");
        const wordDisplay = document.getElementById("wordDisplay");

        expect(romanDisplay.textContent).toBe(mockProgression);
        expect(wordDisplay.textContent).toContain("A minor");
        expect(wordDisplay.textContent).toContain("B minor");
        expect(wordDisplay.textContent).toContain("C minor");
        expect(wordDisplay.textContent).toContain("D minor");

        global.genAlphabet.mockRestore();
    });
});
