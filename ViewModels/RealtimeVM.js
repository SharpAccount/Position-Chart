import chart from "../Helpers/chart.js";
import handleRefresh from "../Helpers/refreshHandler.js";

const recordBtn = document.getElementById('recordBtn');
const rtChart = document.getElementById('rtChart');
const realtimeChart = chart.realtime(rtChart, () => {});

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
    const isPaused = handle();
    if (isPaused) {
        recordBtn.innerText = 'Начать запись'
    } else {
        recordBtn.innerText = 'Остановить запись'
        realtimeChart.data.datasets.forEach(dataset => dataset.data = []);
    }
})
