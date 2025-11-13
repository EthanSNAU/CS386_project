const { getPitchClassPitch } = require("./pitchClass.js");

const DEFAULT_OCTAVE = 4;

class Note {
    #pitchClass
    #pitch
    #octave
    #length // unused for now

    constructor(pitchClass, octave = DEFAULT_OCTAVE) {
        this.#pitchClass = pitchClass;
        this.#octave = octave;
        this.#pitch = getPitchClassPitch(pitchClass);
    }

    getPitchClass() {
        return this.#pitchClass;
    }
}

this.modules = {
    Note
};