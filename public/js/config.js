// every path is relative to the 'public' directory
const PATHS = {
    bootstrap: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    scripts: "/js/",
    css: "/css/",
    images: "/images/",
    pages: "/pages/"
}

// asynchronously loads a script and returns a promise
function loadScript(scriptName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = PATHS.scripts + scriptName;
        script.async = false; // make sure scripts are loaded in order
        
        script.onload = () => resolve(scriptName);
        script.onerror = () => reject(new Error("Failed to load script: " + scriptName));

        document.head.appendChild(script);
    });
}

// loads scripts immediately in order
async function loadScriptsInOrder(scriptNames) {
    for (const name of scriptNames) {
        await loadScript(name);
    }
}

// use for running code after the DOM is fully loaded
function onDomLoad(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// loads bootstrap CSS
function loadBootstrap() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = PATHS.bootstrap;
    link.integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
    link.crossOrigin = "anonymous";

    document.head.appendChild(link);
}