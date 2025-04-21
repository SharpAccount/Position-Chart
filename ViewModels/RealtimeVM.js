import chart from "../Helpers/chart.js";
import handleRefresh from "../Helpers/refreshHandler.js";

const recordBtn = document.getElementById('recordBtn');
const rtChart = document.getElementById('rtChart');
const selectBtn = document.getElementById('selectBtn');

const realtimeChart = chart.realtime(rtChart, () => {});

const annotation = {
    annotations: {
        highlight: null,
        leftBorder: null,
        rightBorder: null
    }
};
const isChanging = {
    leftBorder: false,
    rightBorder: false
};

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
        annotation.annotations.highlight = null;
        annotation.annotations.leftBorder= null;
        annotation.annotations.rightBorder = null;
        isHighlights = false;
        realtimeChart.data.datasets.forEach(dataset => dataset.data = []);
        selectBtn.classList.add('invisible');
    }
});


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
            xMin: startXPosition+2000,
            xMax: finishXPosition-2000,
            yMin: startYPosition-10,
            yMax: finishYPosition+10,
            backgroundColor: 'rgba(245,219,168,0.2)',
            borderWidth: 0
        };
        annotation.annotations.leftBorder = {
            type: 'line',
            xMin: startXPosition+2000,
            xMax: startXPosition+2000,
            borderWidth: 2
        };
        annotation.annotations.rightBorder = {
            type: 'line',
            xMin: finishXPosition-2000,
            xMax: finishXPosition-2000,
            borderWidth: 2
        }
        realtimeChart.options.plugins.annotation = annotation;
        isHighlights = true;
        realtimeChart.update();
    }
});

rtChart.addEventListener('click', (ev) => {
    const chartRect = rtChart.getBoundingClientRect();
    const posX = ev.clientX - chartRect.left;
    const xAxis = realtimeChart.scales.x;
    const valX = xAxis.getValueForPixel(posX);

    const leftHighlightBorder = realtimeChart.options.plugins.annotation.annotations.leftBorder.xMin;
    const rightHighlightBorder = realtimeChart.options.plugins.annotation.annotations.rightBorder.xMin;

    if (Math.abs(valX - leftHighlightBorder) <= 1000) {
        isChanging.leftBorder = true;
        realtimeChart.options.plugins.annotation.annotations.leftBorder.borderWidth = 5;

        if (isChanging.rightBorder) {
            isChanging.rightBorder = false;
            realtimeChart.options.plugins.annotation.annotations.rightBorder.borderWidth = 2;
        }

        realtimeChart.update();
    } else if (Math.abs(valX - rightHighlightBorder) <= 1000) {
        isChanging.rightBorder = true;
        realtimeChart.options.plugins.annotation.annotations.rightBorder.borderWidth = 5;

        if (isChanging.leftBorder) {
            isChanging.leftBorder = false;
            realtimeChart.options.plugins.annotation.annotations.leftBorder.borderWidth = 2;
        }

        realtimeChart.update();
    }
})