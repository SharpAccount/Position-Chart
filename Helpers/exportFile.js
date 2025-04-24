// Helpers/exportFile.js
(function(global){
    function exportFile(element, data, fileType) {
        var blob = new Blob([data], { type: fileType });
        element.href = URL.createObjectURL(blob);
        element.download = 'data';
    }
    global.exportFile = exportFile;
})(window);
