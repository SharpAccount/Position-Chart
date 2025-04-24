(function(global){
    function max(datasets) {
        return Math.max.apply(null,
            datasets.map(function(ds){ return Math.max.apply(null, ds.data.map(function(pt){ return pt.y; })); })
        );
    }
    function min(datasets) {
        return Math.min.apply(null,
            datasets.map(function(ds){ return Math.min.apply(null, ds.data.map(function(pt){ return pt.y; })); })
        );
    }
    global.max = max;
    global.min = min;
})(window);