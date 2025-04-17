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

const handleRecord = chart => {
    let isPaused = true;
    const handle = () => {
        isPaused = !isPaused;
        chart.options.scales.x.realtime.pause = !chart.options.scales.x.realtime.pause;
        chart.options.scales.x.realtime.onRefresh = isPaused
            ? () => {}
            : handleRefresh;
        chart.update('none');
        return isPaused;
    }
    return handle;
}

const handle = handleRecord(realtimeChart);

recordBtn.addEventListener('click', (ev) => {
    isPaused = handle();
    if (isPaused) {
        recordBtn.innerText = 'Начать запись'
        selectBtn.classList.remove('invisible');
    } else {
        recordBtn.innerText = 'Остановить запись'
        realtimeChart.data.datasets.forEach(dataset => dataset.data = []);
        selectBtn.classList.add('invisible');
    }
})


selectBtn.addEventListener('click', () => {

})