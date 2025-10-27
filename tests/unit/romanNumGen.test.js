const FILE_PATH = "../../src/public/scripts/romanNumGen.js";
const { getRandomInt, genRomanNumeral, genInversions, clearInversions, NUM_CHORDS } = require(FILE_PATH);
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

/* ============================================= genBassNotes tests ============================================= */

describe(`genBassNotes`, () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    for (let i = 0; i < NUM_CHORDS; i++) {
      document.body.innerHTML += `<p id="bassNote${i + 1}"></p>`;
    }
  });

  test(`Generates correct number of bass notes`, () => {
    const bassNoteString = genBassNotes();
    expect(bassNoteString.split(" ").length).toBe(NUM_CHORDS);
  });

  test(`Generates valid bass notes`, () => {
    const validNotes = ["C", "D", "E", "F", "G", "A", "B"];
    for (let i = 0; i < iterationCount; i++) {
      const bassNoteString = genBassNotes();
      bassNoteString.split(" ").forEach(note => {
        expect(validNotes).toContain(note);
      });
    }
  });

  test(`Display elements update correctly`, () => {
    const bassNoteString = genBassNotes();
    const bassNotes = bassNoteString.split(" ");
    for (let j = 0; j < NUM_CHORDS; j++) {
      const displayElement = document.getElementById(`bassNote${j + 1}`);
      expect(displayElement.textContent).toBe(bassNotes[j]);
    }
  });
});