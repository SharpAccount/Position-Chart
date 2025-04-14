import timeHandler from "../Helpers/timer.js";
import handleRefresh from "../Helpers/refreshHandler.js";

const recordBtn = document.getElementById('recordBtn');
const time = document.getElementById('time');
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
    isRecording: false,
    start: function() {
        this.isRecording = true;
        this.interval = setInterval(() => {
            time.innerText = timeHandler.addSecond();
            handleRefresh(recorded);
        }, 1000);
    },
    stop: function() {
        this.isRecording = false;
        time.innerText = timeHandler.clearTime();
        clearInterval(this.interval);
        console.log(recorded);
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
    if (exportFormat.selectedIndex === 0) {

    } else {

    }
    //export func
})