// ViewModels/RecordVM.js
(function(global){
    document.addEventListener('DOMContentLoaded', function(){
        var exportLink   = document.getElementById('exportLink'),
            timeEl       = document.getElementById('time'),
            recordBtn    = document.getElementById('recordBtn'),
            exportBtn    = document.getElementById('exportBtn'),
            exportForm   = document.getElementById('exportForm'),
            exportFormat = document.getElementById('exportFormat');

        function Timer(){
            var t = { s:0, m:0, h:0 };
            return {
                addSecond: function(){
                    if (++t.s === 60) { t.s=0; if (++t.m===60){ t.m=0; t.h++; } }
                    return [t.h,t.m,t.s].map(function(v){ return v<10?'0'+v:v; }).join(':');
                },
                clearTime: function(){
                    t.s=t.m=t.h=0; return '00:00:00';
                }
            };
        }
        var timer    = Timer(),
            recorded = { data:{ datasets:[
                        {label:'Позиция x',backgroundColor:'rgba(255,0,0,1)',borderColor:'rgba(255,0,0,1)',data:[],tension:.1},
                        {label:'Позиция y',backgroundColor:'rgba(0,255,0,1)',borderColor:'rgba(0,255,0,1)',data:[],tension:.1},
                        {label:'Позиция z',backgroundColor:'rgba(0,0,255,1)',borderColor:'rgba(0,0,255,1)',data:[],tension:.1}
                    ]}};
        var record = {
            interval:null, timerId:null, isRecording:false,
            start: function(){
                this.isRecording = true;
                this.timerId = setInterval(function(){
                    timeEl.innerText = timer.addSecond();
                },1000);
                this.interval = setInterval(function(){
                    global.handleRefresh(recorded);
                },100);
            },
            stop: function(){
                this.isRecording = false;
                clearInterval(this.interval);
                clearInterval(this.timerId);
                timeEl.innerText = timer.clearTime();
            }
        };

        recordBtn.addEventListener('click', function(){
            if (!record.isRecording) {
                recordBtn.innerText = 'Остановить запись';
                record.start();
            } else {
                recordBtn.innerText = 'Начать запись';
                record.stop();
                exportForm.classList.remove('invisible');
                exportForm.classList.add('visible');
            }
        });

        exportBtn.addEventListener('click', function(){
            var payload, fmt = exportFormat.value;
            if (fmt === 'json') {
                payload = JSON.stringify(recorded.data);
                global.exportFile(exportLink, payload, global.fileTypes.json);
            } else {
                payload = global.CSV.toCSV(recorded.data.datasets, ';');
                global.exportFile(exportLink, payload, global.fileTypes.csv);
            }
        });
    });
})(window);
