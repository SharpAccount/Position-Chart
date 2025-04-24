// Helpers/refreshHandler.js
(function(global){
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }
    function handleRefresh(chart) {
        var now = Date.now();
        chart.data.datasets.forEach(function(ds){
            ds.data.push({ x: now, y: rand(-100, 100) });
        });
    }
    global.handleRefresh = handleRefresh;
})(window);
