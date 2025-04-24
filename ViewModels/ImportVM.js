// ViewModels/ImportVM.js
(function(window){
    document.addEventListener('DOMContentLoaded', function(){
        var importForm     = document.getElementById('chartInpt');
        var lnChartEl      = document.getElementById('lnChart');
        var nothingReport  = document.getElementById('nothingReport');
        var reader = new FileReader();
        var currentChart   = null;

        importForm.addEventListener('input', function(ev){
            var file = ev.target.files[0];
            if (!file) return;

            reader.onload = function(loadEvt){
                var content = loadEvt.target.result;
                var data;
                if (file.type === window.fileTypes.json) {
                    data = JSON.parse(content);
                } else {
                    data = window.CSV.parse(content, ';');
                }

                nothingReport.classList.remove('visible');
                nothingReport.classList.add('invisible');
                lnChartEl.classList.remove('invisible');
                lnChartEl.classList.add('visible');

                if (currentChart) {
                    currentChart.data = data;
                    currentChart.update();
                } else {
                    currentChart = window.chart.linear(lnChartEl, data);
                }
            };

            reader.readAsText(file);
        });
    });
})(window);
