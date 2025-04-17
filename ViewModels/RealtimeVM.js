import chart from "../Helpers/chart.js";
import handleRefresh from "../Helpers/refreshHandler.js";

const recordBtn = document.getElementById('recordBtn');
const rtChart = document.getElementById('rtChart');
const selectBtn = document.getElementById('selectBtn');

const realtimeChart = chart.realtime(rtChart, () => {});

const annotation = {}
let startX = 0;
let endX = 0;
let isHighlights = false;
let isPaused =  true;

recordBtn.addEventListener('click', (ev) => {
    isPaused = !isPaused;
    realtimeChart.options.scales.x.realtime.paused = !isPaused
    chart.options.scales.x.realtime.onRefresh = isPaused
            ? () => {}
            : handleRefresh;
    recordBtn.textContent = isPaused
            ? 'Начать запись'
            : 'Остановить запись';
    if (isPaused) {
        selectBtn.classList.remove('invisible');
    } else {
        delete annotation.annotations.box;
        realtimeChart.data.datasets.forEach(dataset => dataset.data = []);
        selectBtn.classList.add('invisible');
    }
})


selectBtn.addEventListener('click', () => {

})