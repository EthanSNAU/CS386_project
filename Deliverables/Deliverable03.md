# **Deliverable 3 \- Analysis**

## Group 02 – “Musical Chord Progression Generator”

# 1\. System Description

The problem of difficult learning/composing of complex music affects musicians of all levels; the impact of which is their music lacking identity, or worse, the musician not understanding music at all.  For musicians interested in the chord progression music theory, Musegen is a web-app music-making tool that amends this by suggesting a wide range of **chord progressions** to the user, allowing them to listen and test suggestions on the go; unlike other music-making tools such as Hooktheory and Scaler Music, our product isolates and partially automates the process of creating **chord progressions** to make learning/implementing them as easy as possible. As a whole, Musegen allows musicians to generate, listen to, and export **chord progressions** for whatever they need.

The key requirements of Musegen start with the **user**.  As a musician, the **user *creates*** and ***manages*** multiple **projects** and **chord progressions**.  Each **user** is identifiable via their *email* and *username*, and they are able to manage their account preferences at any time.

**Projects** are ***collections of*** **chord progressions**.  In **projects**, **users** can test how their **chord progressions** compare to each other as well as how they sound back-to-back or looped.  Additionally, a **project’s** *name* and *playback speed* can be saved.  Both **projects** and **individual progressions** can be exported in the **user’s** preferred format.

**Chord progressions** are a single line of sheet music ***generated*** by the **user**.  In a **project**, **chord progressions** can be lined up side-by-side for testing.  Every chord progression has a *name* and *root key* (represented as a string).

**Sections *are collections*** of **measures** and are parts of **chord progressions**.  Each **section** has a *tempo*, *clef*, *time signature*, and *key*.  The purpose of a **section** is to split up areas of sheet music where any of its attributes may differ.  If a **section’s** **chord progression** is deleted, the **section** is ***deleted*** along with it.  Similarly, if a **section** is deleted, its associated **measures** are ***deleted*** as well.

**Measures *are fixed-length strings*** of **notes**/**chords**, and ***make up*** **sections**.  Each **measure** has a *number*, *ending barline*, and optional *label*.  If a **measure** is deleted, the **notes**/**chords** inside it are ***deleted*** as well.

**Chords** are ***groups*** ***of*** **notes** that are played simultaneously.  The unique details behind **chords** are *length* and *playback style*, the latter of which affecting how notes are played (i.e. simultaneous vs. staggered).  If a **chord** is deleted, its **notes** are ***NOT deleted***, but rather put into the **measure** as individual **notes** instead of as a group.

**Notes** are musical sounds represented by *pitch*, *length*, and **instrument**.  Other factors—such as staccato, arcs, and fermata—are summarized by fixed-length boolean *flags*.  Both individual **notes** and **chords** can be played for testing purposes. The list of **instruments** may change at any time, with each one being represented by *name*, *range*, and *timbre*.