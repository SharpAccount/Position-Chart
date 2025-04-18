import chart from "../Helpers/chart.js";
import handleRefresh from "../Helpers/refreshHandler.js";

const recordBtn = document.getElementById('recordBtn');
const rtChart = document.getElementById('rtChart');
const selectBtn = document.getElementById('selectBtn');

const realtimeChart = chart.realtime(rtChart, () => {});

const annotation = {
    annotations: {
        highlight: {}
    }
};
let startX = 0;
let endX = 0;
let isHighlights = false;
let isPaused =  true;

recordBtn.addEventListener('click', (ev) => {
    isPaused = !isPaused;
    realtimeChart.options.scales.x.realtime.pause = isPaused
    realtimeChart.options.scales.x.realtime.onRefresh = isPaused
            ? () => {}
            : handleRefresh;
    recordBtn.textContent = isPaused
            ? 'Начать запись'
            : 'Остановить запись';
    if (isPaused) {
        selectBtn.classList.remove('invisible');
    } else {
        annotation.annotations.highlight = {};
        isHighlights = false;
        realtimeChart.data.datasets.forEach(dataset => dataset.data = []);
        selectBtn.classList.add('invisible');
    }
})


selectBtn.addEventListener('click', () => {
    if (!isHighlights) {
        const xAxis = realtimeChart.scales.x;
        const yAxis = realtimeChart.scales.y;

        const startXPosition = xAxis.getValueForPixel(0);
        const startYPosition = yAxis.getValueForPixel(0);

        const finishXPosition = xAxis.getValueForPixel(realtimeChart.width);
        const finishYPosition = yAxis.getValueForPixel(realtimeChart.height);

        annotation.annotations.highlight = {
            type: 'box',
            xMin: startXPosition,
            xMax: finishXPosition,
            yMin: startYPosition,
            yMax: finishYPosition
        }
        realtimeChart.options.plugins.annotation = annotation;
        console.log(realtimeChart.options.plugins.annotation)
        isHighlights = true;
        realtimeChart.update();
    }
})