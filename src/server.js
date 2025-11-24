/* ------------------------------------------- Imports ------------------------------------------- */
import express from "express";
import path from "path";
import ejs from "ejs";
import fs from "fs"
import { fileURLToPath } from "url";

/* ------------------------------------------- Setup ------------------------------------------- */
const app = express(); // create Express instance
const PORT = 3000;
const URL = 'http://localhost:' + PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = path.join(__dirname, 'public');
const STATIC_SCRIPTS_DIR_NAME = 'scripts';
const VIEWS_DIR = path.join(__dirname, 'views');
const LAYOUT_NAME = "layout";

/* ------------------------------------------- Routes ------------------------------------------- */
// resolve static directory imports
app.use((req, res, next) => {
    const requestPath = path.join(STATIC_DIR, req.path);

    // if the path is a directory, append a /
    if (fs.existsSync(requestPath) && fs.lstatSync(requestPath).isDirectory() && !req.path.endsWith("/")) {
        return res.redirect(301, req.path + "/");
    }

    next();
});

// static script resolution
app.use("/" + STATIC_SCRIPTS_DIR_NAME, express.static(
    path.join(STATIC_DIR, STATIC_SCRIPTS_DIR_NAME),
    { index: "index.js" }
));

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
        scripts: ["romanNumGen.js"],
        startupFunction: {
        filepath: "/scripts/romanNumGen.js",
        signature: "init"
        }
    });
})

// catch all other routes and return 404
// app.use((req, res) => {
    
// })

/* ------------------------------------------- Start server ------------------------------------------- */
app.listen(PORT, () => {
    console.log("Server running on " + URL);
});