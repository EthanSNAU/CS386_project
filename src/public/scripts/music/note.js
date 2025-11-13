import { OCTAVE_HALF_STEP_LENGTH, getPitchClassPitch } from "./pitchClass.js";

const DEFAULT_OCTAVE = 4;

// TODO: make octaves relative to the scale (?) the note lives in
// might cause overhead
export class Note {
    #pitchClass
    #pitch
    #octave
    #length // unused for now

    constructor(pitchClass, octave = DEFAULT_OCTAVE) {
        this.#pitchClass = pitchClass;
        this.#octave = octave;
        this.#pitch = getPitchClassPitch(pitchClass, octave);
    }

    getPitchClass() {
        return this.#pitchClass;
    }

    getOctave() {
        return this.#octave;
    }

    transposeBy(numHalfSteps) {
        let newPitchClass = (this.#pitchClass + numHalfSteps) % OCTAVE_HALF_STEP_LENGTH;
        while (newPitchClass < 0) newPitchClass += OCTAVE_HALF_STEP_LENGTH;
        const newOctave = this.#octave + Math.trunc(numHalfSteps / OCTAVE_HALF_STEP_LENGTH);
        this.transposeTo(newPitchClass, newOctave);
    }

    transposeTo(pitchClass, octave = this.#octave) {
        this.#pitchClass = pitchClass;
        this.#octave = octave;
        this.#pitch = getPitchClassPitch(pitchClass, octave);
    }
}

// this.modules = {
//     Note
// };