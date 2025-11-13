const { PitchClassMap, PITCH_CLASS_BASE_OCTAVE } = require("pitchClass.js");

const DEFAULT_OCTAVE = 4;

function calculatePitch(pitchClass, octave) {
    return 
}

class Note {
    #pitchClass
    #pitch
    #octave
    #length // unused

    constructor(pitchClass, octave = DEFAULT_OCTAVE) {
        this.#pitchClass = pitchClass;
        this.#pitch = Math.pow(2, octave - PITCH_CLASS_BASE_OCTAVE) * PitchClassMap[pitchClass].basePitch;
        this.#octave = octave;
    }

    getPitchClass() {
        return this.#pitchClass;
    }
}

this.modules = {
    Note,
};