# **Deliverable 4 \- Implementation 1**

## Group 02 – “Musical Chord Progression Generator”

# 1\. Introduction

## 1.1 Description

In music theory, a chord progression is a sequence of chords that acts as the backing to a piece of music.  Because many musicians compose music centered around them, Musegen aims to streamline the process of generating, reading, and listening to chord progressions.  Primary features include the ability to test suggestions, modify individual chords/notes, and save/load projects.  In doing so, we aim to make learning and implementing chord progressions as easy as possible.

**Changes made**: Little to none

## 1.2 Value Proposition

**Value proposition**: Musegen is a web-app music-making tool that assists musicians interested in chord progression music theory, allowing them to generate, listen to, and export chord progressions for whatever they need.

**Consumer segment**: Musicians interested in the music theory of chord progressions

**Changes made**: Little to none

## 1.3 MVP

The minimum viable product (MVP) for Musegen focuses on the user’s ability to create and modify chord progressions.  As it stands, chord progressions can be randomly generated (along with their inversions and root notes), and the user has the power to modify any individual chord to their liking.  This includes the ability to randomize certain properties of their selected chord, such as the inversion, root note, and any additional notes they would like to overlay on top of it.  The user may also specify how long they want their chord progression to be, being able to dynamically add or remove chords as they see fit.

**Changes made**: Listening to chord progressions has been removed (but remains a top priority)

## 1.4 Repository

[https://github.com/EthanSNAU/CS386\_project](https://github.com/EthanSNAU/CS386_project)

# 2\. Implemented Requirements

## 2.1 Adolfo Lopez Villanueva
## 2.2 Benjamin Jones
## 2.3 Christofer Vega
## 2.4 Ethan Sudol
## 2.5 Marcus Luca
## 2.6 Nolan Carlisle

**Pull requests**: [https://github.com/EthanSNAU/CS386\_project/issues?q=is%3Apr%20author%3ANCarlisle24](https://github.com/EthanSNAU/CS386_project/issues?q=is%3Apr%20author%3ANCarlisle24)  
(need screenshot)

### 2.6.1 Random chord generation (major and minor)

**Requirement**: As a musician , I want generate random chords so that i can quickly find inspiration for musical pieces without having to have a deep knowledge of music theory  
**Issue**: [https://github.com/EthanSNAU/CS386\_project/issues/19](https://github.com/EthanSNAU/CS386_project/issues/19)  
**Pull request**: [https://github.com/EthanSNAU/CS386\_project/pull/26](https://github.com/EthanSNAU/CS386_project/pull/26)  
**Implemented by**: Nolan Carlisle  
**Approved by**: Ethan Sudol  
**Automated Tests**: [https://github.com/EthanSNAU/CS386\_project/blob/main/tests/unit/romanNumGent.test.js](https://github.com/EthanSNAU/CS386_project/blob/main/tests/unit/romanNumGen.test.js)  
**Visual evidence**:  
![nolan requirement 1](img/deliverable04/nolan-requirement-1.png)

### 2.6.2 Random inversion generation

**Requirement**: As a musician, I want to use inversions so that I can get more complex emotions from my chords  
**Issue**: [https://github.com/EthanSNAU/CS386\_project/issues/13](https://github.com/EthanSNAU/CS386_project/issues/13)  
**Pull request**: [https://github.com/EthanSNAU/CS386\_project/pull/26](https://github.com/EthanSNAU/CS386_project/pull/26)  
**Implemented by**: Nolan Carlisle  
**Approved by**: Ethan Sudol  
**Automated Tests**: [https://github.com/EthanSNAU/CS386\_project/blob/main/tests/unit/romanNumGen.test.js](https://github.com/EthanSNAU/CS386_project/blob/main/tests/unit/romanNumGen.test.js)  
**Visual evidence**:  
![nolan requirement 2](img/deliverable04/nolan-requirement-2.png)

# 3\. Automated Testing

## 3.1 Testing Framework

**Name**: Jest  
**Reason**: Jest grants the ability to simulate DOM elements, allowing unit/integration tests to check if display elements are being updated properly.  Additionally, in case the project scope ever expands, it offers support for many heavier frameworks (i.e. React).  
**Location**: [https://github.com/EthanSNAU/CS386\_project/tree/tests](https://github.com/EthanSNAU/CS386_project/tree/tests)

## 3.2 Example

**Test performed**: [https://github.com/EthanSNAU/CS386\_project/blob/main/tests/unit/romanNumGen.test.js](https://github.com/EthanSNAU/CS386_project/blob/main/tests/unit/romanNumGen.test.js)  
**Code tested**: [https://github.com/EthanSNAU/CS386\_project/blob/main/src/public/scripts/romanNumGen.js](https://github.com/EthanSNAU/CS386_project/blob/main/src/public/scripts/romanNumGen.js)  
**Explanation**: genRomanNumeral() is supposed to do two things: Randomly generate a string of Roman numerals (from I to VII) and update the chord progression display.  In the test below, Jest made sure that genRomanNumeral() generated the right number of chords (four in this case), returned a string of valid Roman numerals, and updated the correct display elements.  
**Results**:  
![automated test example](img/deliverable04/automated-test-example.png)

# 4\. Technology Stack

## 4.1 HTML and CSS

**Description**: HTML and CSS are structuring languages used to create frontend elements for Musegen.

**Justification**: Both technologies are vital to serving web applications that can run on most devices. They also presented the easiest learning curve, as most members were already familiar with them.

## 4.2 JavaScript (Node)

**Description**: JavaScript is the programming language used to set up the server/API of Musegen.  This includes setting up middleware and dynamically modifying HTML/CSS when necessary.

**Justification**: Despite having its flaws, JavaScript is widely used, resulting in robust package support via Node.  Additionally, it has the ability to interact with both frontend and backend elements, which greatly simplifies the learning process and maintains a uniform technology stack.

## 4.3 ExpressJS

**Description**: ExpressJS serves as the web framework for Musegen, allowing easy access to middleware modification and rendering engines.

**Justification**: Due to its minimalism, ExpressJS works well for Musegen thanks to the latter’s (relatively) small scale. It offers a low level of control over middleware without weighing team members down with overly-repetitive semantics.

## 4.4 Embedded JavaScript (EJS)

**Description**: EJS is the view engine used by Musegen to simplify HTML creation.  Its main use is in maintaining DRY, supporting templates that can be reused in any HTML file.

**Justification**: The rendering engine transpiles JavaScript to raw HTML, offering just as much control over UI as JavaScript does. This allows team members to take advantage of DRY and makes the technology stack as uniform as possible.

## 4.5 WebAudio API

**Description**: Though not implemented yet, the WebAudio API grants the ability to play notes.

**Justification**: Musegen’s goal is to support MIDI exporting, meaning low-level control of individual notes is absolutely necessary.  WebAudio API provides this (down to the timbre, pitch, and length) whereas other frameworks tend to abstract these features away.

# 5\. Learning Strategy

The team acquired many technical skills throughout the development of Musegen.  Major strategies include the following:

* Not being afraid to search something up  
* Creating a Discord channel dedicated to development questions  
* Getting in a call or meeting with each other when development is particularly difficult  
* Supporting each others’ decisions to learn independently or together when requested  
* Creating quick prototypes to test acquired knowledge

## 5.1 Major Challenges

### 5.1.1 Learning how to play music

**Description**: Playing music via JavaScript is surprisingly difficult, so much so that playing chord progressions was delayed multiple times.

* Primary options included MIDI and a multitude of other frameworks/formats  
* Translating chords to playable file formats brings its own host of difficulties

**Solution**: A proof of concept for playing and converting notes to playable files is being collaborated on.

### 5.1.2 Learning music theory

**Description**: Due to the nature of Musegen, it became clear that understanding basic music theory is, to some extent, a prerequisite to understanding why certain features are designed the way they are.  To encourage design collaboration, team members needed to learn about chord progressions.

**Solution**: Team members that had no experience with music theory grouped together to learn and share insights, including learning resources.

### 5.1.3 Deciding between OOP and functional programming

**Description**: Music consists of multiple layers of elements, including notes, chords, measures, sections, and so on.  Every element has its own properties and methods, so deciding between OOP and functional programming was difficult.

* OOP would make it easy to replicate functionality at the cost of spaghetti code  
* Functional programming would keep it simple while potentially violating DRY principles

**Solution**: Team members took the time to discuss it over several meetings. Through a unanimous vote, it was eventually decided that functional programming would be used until the scope grows, at which point the discussion will be revisited.

## 5.2 Time spent learning technologies

**HTML and CSS**: 2 hours (mainly looking up documentation)  
**JavaScript**: 1 hour (same as above)  
**ExpressJS**: 3 hours  
**Embedded JavaScript**: 5 hours  
**WebAudio API**: 12 hours and counting

## 5.3 Learning Resources Used

**Embedded JavaScript Documentation**: [https://ejs.co/\#docs](https://ejs.co/#docs)  
**Express 5.x Documentation**: [https://expressjs.com/en/5x/api.html](https://expressjs.com/en/5x/api.html)  
**GeeksForGeeks**: [https://www.geeksforgeeks.org](https://www.geeksforgeeks.org)

* Used for a little bit of everything

**List of common chord progressions (HookTheory)**: [https://www.hooktheory.com/theorytab/common-chord-progressions](https://www.hooktheory.com/theorytab/common-chord-progressions)  
**MDM Web Docs**: [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)

* Documentation for HTML, CSS, and JS packages (i.e. WebAudio API)

**Music theory course**: [https://www.musictheory.net/lessons](https://www.musictheory.net/lessons)

# 6\. Deployment
# 7\. Licensing

**License used**: MIT License  
**Justification**: Team members agreed that they don’t care too much about what other people do with Musegen’s code.  As such, a simple and permissive license was used.

# 8\. Repository Documentation

**README.md**: [https://github.com/EthanSNAU/CS386\_project/blob/main/README.md](https://github.com/EthanSNAU/CS386_project/blob/main/README.md)  
**LICENSE**: [https://github.com/EthanSNAU/CS386\_project/blob/main/LICENSE](https://github.com/EthanSNAU/CS386_project/blob/main/LICENSE)

# 9\. User Interface Design
# 10\. Retrospective Analysis
# 11\. System Demonstration