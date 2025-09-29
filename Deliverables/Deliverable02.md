# Deliverable 2 - Requirements
Group 02 – “Musical Chord Progression Generator”

## 1. Positioning

### 1.1 Problem Statement
The problem of difficult learning/composing of complex music affects musicians of all levels; the impact of which is their music lacking identity, or worse, the musician not understanding music at all.

### 1.2 Product Position Statement
For musicians interested in the chord progression music theory, [app name] is a web-app music-making tool that suggests a wide range of chord progressions to the user, giving them the opportunity to listen and test suggestions on the go; unlike other music-making tools such as Hooktheory and Scaler Music, our product isolates and partially automates the process of creating chord progressions to make learning/implementing them as easy as possible.

### 1.3 Value Proposition
Value proposition: [app name] is a web-app music-making tool that assists musicians interested in the chord progression music theory, allowing them to generate, listen to, and export chord progressions for whatever they need.
Consumer segment: Musicians interested in the music theory of chord progressions

## 2. Stakeholders
<u>Developers</u><br/>
Developers are the ones responsible for creating the application according to its specifications.  This includes iterating on the app, adding/removing/improving features as they go along.

<u>Testers/users</u><br/>
Future testers/users will be responsible for evaluating the application for usability, performance, and other requirements.  Some users may give feedback, allowing developers to properly iterate on the app.

<u>Music community</u><br/>
If trends in the music community shift, so do the most popular progressions, affecting the algorithm that suggests chord progressions to the user as well as each one’s description.

<u>Competitors</u> (eg. Hooktheory and Scaler Music)<br/>
Other similar apps set the bar for what [app name] should provide to the user.  If they set a high standard, the app needs to match—and in some aspects, surpass—that standard.

## 3. Functional requirements (features)
<ol>
    <li>Users can generate and view chord progressions based on key, scale, and complexity</li>
    <li>Users can add, remove, and adjust individual tones in their generated chord progressions</li>
    <li>Users can adjust the length and timing of individual notes in their generated chord progressions</li>
    <li>Users can listen to their generated chord progressions</li>
    <li>Users can export their generated chord progressions in their preferred format</li>
    <li>Users can adjust the time signature of their generated chord progressions</li>
    <li>Users can select the instrument that plays their generated chord progressions</li>
    <li>Users can adjust the playback style of their generated chord progressions</li>
    <li>Users can adjust the tempo of their generated chord progressions</li>
    <li>Users can adjust the looping behavior of their generated chord progressions</li>
    <li>Users can create and log into personal accounts</li>
    <li>Users can save generated chord progressions to their account</li>
    <li>Users can edit generated chord progressions saved under their account</li>
    <li>Users can manage personal account settings/preferences</li>
</ol>

## 4. Non-functional requirements
<ol>
    <li>Usability - The system shall support the modification, playing, and exporting of sixteenth-notes at minimum</li>
    <li>Compatibility - The system shall support, at minimum, MIDI, MP3, and WAV file export formats</li>
    <li>Performance - The system shall start audio playback within 200ms of the user requesting it</li>
    <li>Security - The system shall use a database that encrypts user data via SHA-256 hashing</li>
    <li>Reliability - The system shall maintain at least 99% uptime</li>
    <li>Scalability - The system shall use a database that can support at least 100000 total generated chord progressions</li>
    <li>Resource constrained - Webpages shall take up no more than 5MB of space each</li>
    <li>Portability - The system shall host a responsive UI that works with screens of width 360px at minimum and 1920px at maximum</li>
    <li>Maintainability - The codebase shall host automated tests that completely cover at least 80% of all webpages at any given time</li>
</ol>

## 5. MVP
The minimum viable product (MVP) for [app name] will prioritize the user's ability to create, modify, and listen to their chord progressions.  This means that key/scale/complexity selection, individual note modification and listening will come first, with the piano being the default instrument. From there, we’ll perform interviews revolving around the product and play it by ear, asking if they are satisfied with their experience and what else they’d want to see in the app, if anything.  In the absence of user feedback, functional requirements will be implemented going down the list (with the topmost ones holding more priority).  If feedback is present, functional requirements will be modified to suit the needs of a wider user base.  Afterwards, the process will be repeated, gathering more user feedback via interviews or online means (eg. Google Forms).

## 6. Use Cases
### 6.1 use case diagram
### 6.2 Use case descriptions and interface sketch
**Use Case:** Generate Chord Progression <br>
**Actors:** Musician <br>
**Description:** This use case allows the musician to automatically generate a new chord progression based on chosen parameters such as key, style, and complexity. The system provides a starting point for musical ideas that the musician can further adjust, save, and use in their creative process. <br>

**Pre-Condition:**
<ol>
    <li>The musician enters the website
    <li>The musician is logged in
</ol>

**Post-Condition:**
<ol>
    <li>The musician can see the generated chord progression 
    <li>The musician is able to modify it to their needs
    <li>The musician can save the chord progression to their account
</ol>

**Alternative flows:** <br>

2a. The musician closes the generate window
<ol>
     <li>The system brings the musician back to the main page
</ol>
3a.	Invalid parameters provided
<ol>
    <li>The system can’t generate the chord progression
    <li>The system displays an error message identifying invalid parameters
    <li>The system allows the musician to place new parameters and try again
</ol>

**Use Case:** Interacting with Live Player <br>
**Actors:** Musician <br>
**Description:** The musician interacts with a live audio player to play, pause, stop, or adjust the chord progression in real time. <br>

**Pre-Condition:** 
<ol>
<li>The musician enters the website
<li>The musician is logged in
<li>A chord progression is available for playback
</ol>

**Post-Condition:** 
<ol>
<li>The live player reflects the musician’s interactions
<li>The musician hears real-time adjustments to playback
</ol>

**Main flow:**
<ol>
<li>The musician selects desire chord progression
<li>The musician selects “Play in Live Player” option
<li>The musician performs actions (play, pause, stop, adjust volume, etc.)
<li>The system applies changes instantly in playback
</ol>

**Alternative flows:**
3a. Live player fails to load
<ol>
<li>The system displays an error message
<li>The musician is asked to try again
</ol>
