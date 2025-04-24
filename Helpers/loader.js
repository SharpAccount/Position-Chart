// Helpers/loader.js
(function(global){
    function loadScript(src, onload) {
        var s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.onload = onload;
        document.head.appendChild(s);
    }

    function loadScripts(scripts, callback) {
        var i = 0;
        function next() {
            if (i < scripts.length) {
                loadScript(scripts[i++], next);
            } else if (typeof callback === 'function') {
                callback();
            }
        }
        next();
    }

    global.loadScript  = loadScript;
    global.loadScripts = loadScripts;
})(window);
