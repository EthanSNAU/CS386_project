import { Chord } from "./chord.js";
import { Scale } from "./scale.js";

// documentation imports
import { PitchClass, ALL_SUPPORTED_PITCH_CLASSES } from "./enums/pitchClass.js";
import { PitchClassRepresentationType } from "./enums/pitchClassRepresentationType.js";
import { ChordQuality, ALL_SUPPORTED_CHORD_QUALITIES } from "./enums/chordQuality.js"
import { ChordInversion } from "./enums/chordInversion.js"
import { ChordPlaybackStyle } from "./enums/chordPlaybackStyle.js";
import { ReferentialScale } from "./enums/referentialScale.js";

const DEFAULT_OCTAVE = 4;

/**
 * Represents a set of chords to be played in sequence. Manages chord representations.
 */
export class ChordProgression {
    /** Re-export of {@link PitchClass} */
    static PitchClass = Chord.PitchClass;

    /** Re-export of {@link PitchClassRepresentationType} */
    static PitchClassRepresentationType = Scale.PitchClassRepresentationType;

    /** Re-export of {@link ChordQuality} */
    static ChordQuality = Chord.Quality;

    /** Re-export of {@link ChordInversion} */
    static ChordInversion = Chord.Inversion;

    /** Re-export of {@link ChordPlaybackStyle} */
    static ChordPlaybackStyle = Chord.PlaybackStyle;

    /** Re-export of {@link ReferentialScale} */
    static ReferentialScale = Scale.ReferentialScale;

    /** Re-export of {@link ALL_SUPPORTED_PITCH_CLASSES} */
    static ALL_SUPPORTED_PITCH_CLASSES = Chord.ALL_SUPPORTED_ROOT_PITCH_CLASSES;

    /** Re-export of {@link ALL_SUPPORTED_CHORD_QUALITIES} */
    static ALL_SUPPORTED_CHORD_QUALITIES = Chord.ALL_SUPPORTED_QUALITIES;

    #chords
    #scale
    
    /**
     * Creates a ChordProgression instance.
     * @param {PitchClass}       scaleRootPitchClass Pitch class of the referential scale's root note
     * @param {ReferentialScale} referentialScale    Referential scale type
     * @contributors Nolan
     */
    constructor(scaleRootPitchClass, referentialScale) {
        this.#scale = new Scale(scaleRootPitchClass, referentialScale);
        this.#chords = [];
    }

    /**
     * Gets a chord's representation information.
     * @param {number} chordIndex Integer index of the chord to get information on
     * @returns {{
     *  alphabeticalName:                    string,
     *  alphabeticalSymbol:                  string,
     *  alphabeticalType:                    PitchClassRepresentationType,
     *  alphabeticalCenterSymbolDescriptors: string,
     *  romanName:                           string,
     *  romanSymbol:                         string,
     *  romanType:                           PitchClassRepresentationType,
     *  romanCenterSymbolDescriptors:        string
     *  upperSymbolDescriptors:              string
     *  lowerSymbolDescriptors:              string
     * }} The chord's representation information
     * @contributors Marcus, Nolan
     */
    getChordRepresentation(chordIndex) {
        // TODO: precompute all chord representations and store them in an array instead of running this every time
        const chord = this.#chords[chordIndex];
        const chordPitchClass = chord.getRootPitchClass();

        const qualityRepresentation = chord.getQualityRepresentation();
        const chordRepresentation = this.#scale.getRepresentationFor(chordPitchClass);

        // account for minor and diminished chords
        if (qualityRepresentation.isLowercase) {
            chordRepresentation.romanSymbol = chordRepresentation.romanSymbol.toLowerCase();
        }

        // quality name + symbols
        if (qualityRepresentation.name) {
            chordRepresentation.alphabeticalName += " " + qualityRepresentation.name;
            chordRepresentation.romanName += " " + qualityRepresentation.name;
        }

        // handle symbol descriptors

        chordRepresentation.upperSymbolDescriptors = "";

        if (qualityRepresentation.upperSymbolDescriptors) {
            chordRepresentation.upperSymbolDescriptors = qualityRepresentation.upperSymbolDescriptors;
        }

        if (qualityRepresentation.centerSymbolDescriptors) {
            chordRepresentation.alphabeticalCenterSymbolDescriptors += qualityRepresentation.centerSymbolDescriptors;
            chordRepresentation.romanCenterSymbolDescriptors += qualityRepresentation.centerSymbolDescriptors;

            // remove the m for relevant roman chords
            // TODO: make this less duct tapey
            const chordQuality = chord.getQuality();
            if (chordQuality == Chord.Quality.MINOR || chordQuality == Chord.Quality.HALF_DIMINISHED) {
                chordRepresentation.romanCenterSymbolDescriptors = chordRepresentation.romanCenterSymbolDescriptors.replace("m", "");
            }
        }

        chordRepresentation.lowerSymbolDescriptors = "";

        return chordRepresentation;
    }

    /**
     * Gets the progression's current length.
     * @returns The current number of chords in the progression
     * @contributors Nolan
     */
    getNumChords() {
        return this.#chords.length;
    }

    /**
     * Transposes a chord relative to its current state.
     * @param {number} chordIndex   Integer index of the chord to transpose
     * @param {number} numHalfSteps Number of half steps to transpose the chord by. Negative values tranpose down while
     *                              positive values transpose up. The chord's target pitch classes must be in {@link ALL_SUPPORTED_PITCH_CLASSES} 
     *                              to work.
     */
    transposeChord(chordIndex, numHalfSteps) {
        this.#chords[chordIndex].transposeBy(numHalfSteps);
    }

    /**
     * Transposes a chord to a pitch class and octave.
     * @param {number}     chordIndex Integer index of the chord to transpose
     * @param {PitchClass} pitchClass The pitch class to transpose the note to. Must be in {@link ALL_SUPPORTED_PITCH_CLASSES} to work.
     * @param {number}     octave     The octave to transpose the note to. If unspecified, no changes will be made to the octave.
     * @contributors Nolan
     */
    setChordRootNote(chordIndex, pitchClass, octave = DEFAULT_OCTAVE) {
        const chord = this.#chords[chordIndex];
        chord.transposeTo(pitchClass, octave);
    }

    /**
     * Sets a chord's quality, modifying its notes to match.
     * @param {number}       chordIndex Integer index of the chord to modify
     * @param {ChordQuality} quality    The chord's new quality
     * @contributors Nolan
     */
    setChordQuality(chordIndex, quality) {
        const chord = this.#chords[chordIndex];
        chord.setQuality(quality);
    }

    /**
     * Adds a new chord to the progression.
     * @param {PitchClass}   pitchClass The new chord's pitch class. Defaults to the scale's root note.
     * @param {number}       octave     The new chord's octave. Defaults to {@link DEFAULT_OCTAVE}.
     * @param {ChordQuality} quality    The new chord's quality. Defaults to major.
     * @contributors Nolan
     */
    addChord(pitchClass = this.#scale.getRootPitchClass(), octave = DEFAULT_OCTAVE, quality = ChordProgression.ChordQuality.MAJOR) {
        this.#chords.push(new Chord(pitchClass, octave, quality));
    }

    /**
     * Removes a chord from the progression.
     * @param {number} chordIndex Integer index of the chord to remove
     * @returns {Chord} The removed chord
     * @contributors Nolan
     */
    removeChord(chordIndex) {
        return this.#chords.splice(chordIndex, 1)[0];
    }

    /**
     * Removes all chords from the progression.
     * @contributors Nolan
     */
    clearChords() {
        this.#chords = [];
    }

    /**
     * Removes the last chord from the progression.
     * @returns {Chord} The removed chord
     * @contributors Nolan
     */
    popChord() {
        return this.#chords.pop();
    }
}