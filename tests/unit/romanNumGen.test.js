import { 
    DEFAULT_NUM_CHORDS,
    MAX_CHORDS,
    updateChordDisplay,
    addChord,
    setChordRootNote,
    randomizeChordRootNote,
    setChordQuality,
    randomizeChordQuality,
    invertChord,
    randomizeChordInversion,
    toggleChordDisplayType,
    hideChordName,
    showChordName,
} from "../../src/public/scripts/romanNumGen.js";

/* =============================================  addChord ============================================= */

describe("placeholder", () => {
    test("placeholder", () => {
        expect(true).toBe(true);
    });
});


/* ==================================== hide/show Chord name =========================================== */

function testToggle() {
    let calls = { show: 0, hide: 0 };

    function mockShow() { calls.show++; }
    function mockHide() { calls.hide++; }

    const btn = document.createElement("button");

    btn.addEventListener("click", () => {
        if (btn.classList.toggle("active")) {
            mockShow();
        } else {
            mockHide();
        }
    });

    btn.click();
    btn.click();
    btn.click();

    console.log(calls); 
    // Expected: { show: 2, hide: 1 }
}

testToggle();