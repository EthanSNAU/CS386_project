// every path is relative to the 'public' directory
const PATHS = {
    bootstrap: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    scripts: "/js/",
    css: "/css/",
    images: "/images/",
    pages: "/pages/"
}

function loadScript(scriptName) {
    const script = document.createElement('script');
    script.src = PATHS.scripts + scriptName;
    script.async = false; // make sure scripts are loaded in order
    document.head.appendChild(script);
}