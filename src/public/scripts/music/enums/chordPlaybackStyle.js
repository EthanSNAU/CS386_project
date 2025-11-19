/**
 * Represents chord playback styles and their associated properties
 * @enum {number}
 * @readonly
 */
const ChordPlaybackStyle = (() => {
    const VALUES = Object.freeze({
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
    // export const SUPPORTED_PLAYBACK_STYLES = Object.freeze(Object.keys(ChordPlaybackStyleMap).map(str => parseInt(str)));

    return Object.freeze({
        ...VALUES,
        // SUPPORTED_PLAYBACK_STYLES
    })
})();

export default ChordPlaybackStyle;