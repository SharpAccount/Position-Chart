import LineChart from "./chart.js";
import handleRefresh from "./refreshHandler.js";

const recordBtn = document.getElementById('recordBtn');

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

const handle = handleRecord(LineChart);

recordBtn.addEventListener('click', (ev) => {
    recordBtn.innerText = handle()
        ? 'Начать запись'
        : 'Остановить запись';
})
