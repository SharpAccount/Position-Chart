(function(global){
    document.addEventListener('DOMContentLoaded', function(){
        var exportLink = document.getElementById('exportLink');
        var recordBtn  = document.getElementById('recordBtn');
        var selectBtn  = document.getElementById('selectBtn');
        var rtChartEl  = document.getElementById('rtChart');
        var exportForm = document.getElementById('exportForm');
        var exportFormat = document.getElementById('exportFormat');

        var realtimeChart = global.chart.realtime(rtChartEl, global.handleRefresh);
        var annotation = { annotations:{}};
        var isChanging = { leftBorder:false, rightBorder:false };
        var isHighlights = false;
        var isPaused = true;

        recordBtn.addEventListener('click', function(){
            isPaused = !isPaused;
            realtimeChart.options.scales.x.realtime.pause = isPaused;
            realtimeChart.options.scales.x.realtime.onRefresh = isPaused ? function(){} : global.handleRefresh;
            recordBtn.textContent = isPaused ? 'Начать запись' : 'Остановить запись';

            if (isPaused) {
                selectBtn.classList.remove('invisible');
                exportForm.classList.remove('invisible');
            } else {
                // сброс состояния
                realtimeChart.data.datasets.forEach(function(ds){ ds.data = []; });
                selectBtn.classList.add('invisible');
                exportForm.classList.add('invisible');
                isHighlights = false;
                annotation = { annotations:{}};
            }
        });

        selectBtn.addEventListener('click', function(){
            if (!isHighlights) {
                var xScale = realtimeChart.scales.x;
                var startX = xScale.getValueForPixel(0) + 700;
                var endX   = xScale.getValueForPixel(rtChartEl.width) - 700;
                var startY = global.max(realtimeChart.data.datasets);
                var endY   = global.min(realtimeChart.data.datasets);

                annotation.annotations.highlight = { type:'box', xMin:startX, xMax:endX, yMin:startY, yMax:endY, backgroundColor:'rgba(245,219,168,0.2)', borderWidth:0 };
                annotation.annotations.leftBorder = { type:'line', xMin:startX, xMax:startX, borderWidth:2 };
                annotation.annotations.rightBorder= { type:'line', xMin:endX,   xMax:endX,   borderWidth:2 };
                realtimeChart.options.plugins.annotation = annotation;
                isHighlights = true;
            }
        });

        rtChartEl.addEventListener('click', function(ev){
            var rect = rtChartEl.getBoundingClientRect();
            var valX = realtimeChart.scales.x.getValueForPixel(ev.clientX - rect.left);
            var leftX = realtimeChart.options.plugins.annotation.annotations.leftBorder.xMin;
            var rightX= realtimeChart.options.plugins.annotation.annotations.rightBorder.xMin;

            var distL = Math.abs(valX - leftX);
            var distR = Math.abs(valX - rightX);

            if (distL <= 1000 || distR <= 1000) {
                var isLeft = distL <= distR;
                var key = isLeft?'leftBorder':'rightBorder';
                isChanging[key] = !isChanging[key];
                var ann = realtimeChart.options.plugins.annotation.annotations[key];
                ann.borderWidth = ann.borderWidth===5?2:5;
                var other = isLeft?'rightBorder':'leftBorder';
                if (isChanging[other]) {
                    isChanging[other] = false;
                    realtimeChart.options.plugins.annotation.annotations[other].borderWidth = 2;
                }
            }
        });

        rtChartEl.addEventListener('mousemove', function(ev){
            var rect = rtChartEl.getBoundingClientRect();
            var valX = realtimeChart.scales.x.getValueForPixel(ev.clientX - rect.left);
            if (isChanging.leftBorder) {
                var lb = realtimeChart.options.plugins.annotation.annotations.leftBorder;
                lb.xMin = lb.xMax = valX;
                realtimeChart.options.plugins.annotation.annotations.highlight.xMin = valX;
            } else if (isChanging.rightBorder) {
                var rb = realtimeChart.options.plugins.annotation.annotations.rightBorder;
                rb.xMin = rb.xMax = valX;
                realtimeChart.options.plugins.annotation.annotations.highlight.xMax = valX;
            }
            realtimeChart.update('none');
        });

        exportBtn.addEventListener('click', function(){
            var datasets = realtimeChart.data.datasets.slice();
            if (isHighlights) {
                var left = annotation.annotations.leftBorder.xMin;
                var right= annotation.annotations.rightBorder.xMin;
                datasets = datasets.map(function(ds){
                    return { label:ds.label, backgroundColor:ds.backgroundColor, borderColor:ds.borderColor, tension:ds.
                            tension, data: ds.data.filter(function(pt){ return pt.x>=left && pt.x<=right; }) };
                });
            }
            var payload;
            if (exportFormat.value==='json') {
                payload = JSON.stringify({ datasets:datasets });
                global.exportFile(exportLink, payload, global.fileTypes.json);
            } else {
                payload = global.CSV.toCSV(datasets, ';');
                global.exportFile(exportLink, payload, global.fileTypes.csv);
            }
        });
    });
})(window);