/* ------------------------------------------- Imports ------------------------------------------- */
const express = require('express'); // Local web server hosting
const path = require('path'); // File path utilities

/* ------------------------------------------- Setup ------------------------------------------- */
const app = express(); // create Express instance
const PORT = 3000;
const URL = 'http://localhost:' + PORT;
const PAGES_DIR = path.join(__dirname, 'public/pages');

app.use(express.static('public')); // Work only with files in 'public'

/* ------------------------------------------- Routes ------------------------------------------- */

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(PAGES_DIR, '/index.html'));
})

// catch all other routes and return 404
// app.use((req, res) => {
    
// })

/* ------------------------------------------- Start server ------------------------------------------- */
app.listen(PORT, () => {
    console.log("Server running on " + URL);
});