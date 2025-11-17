/**
 * Available chord playback styles
 * @enum {number}
 * @readonly
 */
export const ChordPlaybackStyle = Object.freeze({
    BLOCK:         0,
    ARPEGGIO_UP:   1,
    ARPEGGIO_DOWN: 2,
    BROKEN:        3
});

/**
 * List of {@link ChordPlaybackStyle}s supported by getter methods such as 
 * @type ChordPlaybackStyle[]
 * @readonly
 */
// export const ALL_SUPPORTED_CHORD_PLAYBACK_STYLES = Object.freeze(Object.keys(ChordPlaybackStyleMap).map(str => parseInt(str)));