// Helpers/CSV.js
(function(global){
    var CSV = {
        parse: function(value, sep) {
            var parsed = value.split('\r\n').map(function(r){ return r.split(sep); });
            var headers = parsed[0], tick = Number(headers[3]);
            var data = parsed.slice(1, -1);
            var labels = ['Позиция x','Позиция y','Позиция z'];
            var colors = [
                {bg:'rgba(255,0,0,1)', br:'rgba(255,0,0,1)'},
                {bg:'rgba(0,255,0,1)', br:'rgba(0,255,0,1)'},
                {bg:'rgba(0,0,255,1)', br:'rgba(0,0,255,1)'}
            ];
            var res = { datasets: colors.map(function(c,i){
                    return { label: labels[i], backgroundColor: c.bg, borderColor: c.br, data: [], tension: .1 };
                })};

            data.forEach(function(vals){
                for (var i=0; i<vals.length; i++) {
                    res.datasets[i].data.push({ x: tick, y: Number(vals[i]) });
                }
                tick += 100;
            });
            return res;
        },
        toCSV: function(datasets, sep) {
            var start = datasets[0].data[0].x;
            var header = 'x'+sep+'y'+sep+'z'+sep+start+'\r\n';
            var lines = datasets[0].data.map(function(_, idx){
                return datasets.map(function(ds){ return ds.data[idx].y; }).join(sep);
            });
            return header + lines.join('\r\n');
        }
    };
    global.CSV = CSV;
})(window);
