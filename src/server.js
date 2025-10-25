/* ------------------------------------------- Imports ------------------------------------------- */
const express = require('express'); // Local web server hosting
const path = require('path'); // File path utilities
const ejs = require('ejs'); // EJS rendering engine

/* ------------------------------------------- Setup ------------------------------------------- */
const app = express(); // create Express instance
const PORT = 3000;
const URL = 'http://localhost:' + PORT;

const STATIC_DIR = path.join(__dirname, 'public');
const VIEWS_DIR = path.join(__dirname, 'views');
const LAYOUT_NAME = "layout";

/* ------------------------------------------- Routes ------------------------------------------- */
// static files (JS, CSS, images, etc.)
app.use(express.static(STATIC_DIR));

app.set("view engine", "ejs"); // use EJS as the template engine
app.set("views", VIEWS_DIR); // specify where views are located

// specify the root directory for includes inside ejs files
app.engine('ejs', (path, data, cb) => {
    ejs.renderFile(path, data, { root: app.get('views') }, cb);
});

// Home page
app.get('/', (req, res) => {
    // render views/pages/home.ejs within views/layout.ejs
    res.render(LAYOUT_NAME, {
        body: "pages/home",
        styles: ["pages/home.css"],
        scripts: ["romanNumGen.js"]
    });
})

// catch all other routes and return 404
// app.use((req, res) => {
    
// })

/* ------------------------------------------- Start server ------------------------------------------- */
app.listen(PORT, () => {
    console.log("Server running on " + URL);
});