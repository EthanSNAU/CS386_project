const FILE_PATH = "../../src/public/scripts/util.js";
import { getRandomInt, getRandomArrayElement, capitalizeFirstChar } from FILE_PATH;

const NUM_ITERATIONS = 100;

/* ================================================= getRandomInt ================================================= */

describe(`getRandomInt`, () => {
    let lowerBound = 1;
    let upperBound = 20;

    const testWithinBounds = (lower, upper) => {
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            const randInt = getRandomInt(lowerBound, upperBound);
            expect(randInt).toBeGreaterThanOrEqual(lowerBound);
            expect(randInt).toBeLessThanOrEqual(upperBound);
        }
    };

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

/* ================================================= getRandomArrayElement ================================================= */

describe("getRandomArrayElement", () => {
    test("Get a random element from null", () => {
        expect(getRandomArrayElement(null)).toBe(null);
    });

    test("Get a random element from an empty array", () => {
        expect(getRandomArrayElement([])).toBe(null);
    });

    test("Get a random element from an array", () => {
        const arr = [5, 10, "jest", {foo: 1, bar: "test"}, 91.5];
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            expect(arr).toContain(getRandomArrayElement(arr));
        }
    });
});

/* ================================================= getRandomArrayElement ================================================= */

describe("capitalizeFirstChar", () => {
    test("Capitalize an empty string", () => {
        expect(capitalizeFirstChar("")).toBe("");
    });

    test("Capitalize null", () => {
        expect(capitalizeFirstChar(null)).toBe("");
    });

    test("Capitalize a string", () => {
        const str = "hello, world!";
        const capitalized = "Hello, world!";
        expect(capitalizeFirstChar(str)).toBe(capitalized);
    });
});