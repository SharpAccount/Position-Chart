(function(global){

    // нужно заменить на const data = fetch('url api').then(res => res.json());
    // также нужно будет добавить async handleRefresh
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }
    function handleRefresh(chart) {
        var now = Date.now();
        // здесь должна быть переменная со результатом вашей функции
        chart.data.datasets.forEach(function(ds){
            ds.data.push({ x: now, y: rand(-100, 100) });
        });
    }
    global.handleRefresh = handleRefresh;
})(window);
