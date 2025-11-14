// every path is relative to the 'public' directory
export const PATHS = {
    bootstrap: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    scripts: "/scripts/",
    css: "/styles/",
    images: "/images/",
    pages: "/pages/"
}

/**
 * Asynchronously loads a scripts into the DOM head
 * @param {string} scriptName Name of the script to load, relative to the static scripts directory
 * @returns {Promise} A promise that resolves when the script loads, or rejects if an error occurs
 * @contributors Nolan
 */
export function loadScript(scriptName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = PATHS.scripts + scriptName;
        script.async = false; // make sure scripts are loaded in order
        script.type = "module"; // allow import statements
        
        script.onload = () => resolve(scriptName);
        script.onerror = () => reject(new Error("Failed to load script: " + scriptName));

        document.head.appendChild(script);
    });
}


/**
 * Loads a sequence of scripts into the DOM head in order
 * @param {string} scriptNames Names of the scripts to load, relative to the static scripts directory
 * @contributors Nolan
 */
export async function loadScriptsInOrder(scriptNames) {
    for (const name of scriptNames) {
        await loadScript(name);
    }
}

/**
 * Calls a function when the DOM is fully loaded
 * @param {() => any} callback
 * @contributors Nolan
 */
export function onDomLoad(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}