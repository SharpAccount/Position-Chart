import timeHandler from "../Helpers/timer.js";
import handleRefresh from "../Helpers/refreshHandler.js";
import exportFile from "../Helpers/exportFile.js";
import fileTypes from "../consts/fileTypes.js";
import CSV from "../Helpers/CSV.js";

const exportLink = document.getElementById('exportLink');
const time = document.getElementById('time');
const recordBtn = document.getElementById('recordBtn');
const exportBtn = document.getElementById('exportBtn');
const exportForm = document.getElementById('exportForm');
const exportFormat = document.getElementById('exportFormat');

const recorded = {
    data: {
        datasets: [
            {
                label: 'Позиция x',
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                data: [],
                tension: 0.1
            },
            {
                label: 'Позиция y',
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                data: [],
                tension: 0.1
            },
            {
                label: 'Позиция z',
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                data: [],
                tension: 0.1
            },
        ]
    }
};

const record = {
    interval: null,
    timer: null,
    isRecording: false,
    start: function() {
        this.isRecording = true;
        this.timer = setInterval(() => {
            time.innerText = timeHandler.addSecond();
        }, 1000);
        this.interval = setInterval(() => {
            handleRefresh(recorded);
        }, 100);
    },
    stop: function() {
        this.isRecording = false;
        time.innerText = timeHandler.clearTime();
        clearInterval(this.interval);
        clearInterval(this.timer);
        console.log(recorded)
    }
}

recordBtn.addEventListener('click', () => {
    if (!record.isRecording) {
        recordBtn.innerText = 'Остановить запись';
        record.start();
        return;
    }
    recordBtn.innerText = 'Начать запись';
    record.stop();
    exportForm.classList.remove('invisible');
    exportForm.classList.add('visible');
});

exportBtn.addEventListener('click', () => {
    let vals;
    if (exportFormat.value === 'json') {
        vals = JSON.stringify(recorded.data);
        exportFile(exportLink, vals, fileTypes.json);
    } else {
        vals = CSV.toCSV(recorded.data.datasets, ';');
        exportFile(exportLink, vals, fileTypes.csv);
    }
})