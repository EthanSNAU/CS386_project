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

function loadBootstrapCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = PATHS.bootstrap;
    link.integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
    link.crossOrigin = "anonymous";

    document.head.appendChild(link);
}