import chart from "../Helpers/chart.js";
import handleRefresh from "../Helpers/refreshHandler.js";
import {max, min} from "../Helpers/max.js";

const exportBtn = document.getElementById('exportBtn');
const recordBtn = document.getElementById('recordBtn');
const selectBtn = document.getElementById('selectBtn');
const rtChart = document.getElementById('rtChart');
const exportForm = document.getElementById('exportForm');

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
        exportForm.classList.remove('invisible');
    } else {
        annotation.annotations.highlight = null;
        annotation.annotations.leftBorder= null;
        annotation.annotations.rightBorder = null;
        isHighlights = false;
        realtimeChart.data.datasets.forEach(dataset => dataset.data = []);
        selectBtn.classList.add('invisible');
        exportForm.classList.add('invisible');
    }
});


selectBtn.addEventListener('click', () => {
    if (!isHighlights) {
        const xAxis = realtimeChart.scales.x;

        const startXPosition = xAxis.getValueForPixel(0)+700;
        const startYPosition = max(realtimeChart.data.datasets);

        const finishXPosition = xAxis.getValueForPixel(realtimeChart.width)-700;
        const finishYPosition = min(realtimeChart.data.datasets);

        annotation.annotations.highlight = {
            type: 'box',
            xMin: startXPosition,
            xMax: finishXPosition,
            yMin: startYPosition,
            yMax: finishYPosition,
            backgroundColor: 'rgba(245,219,168,0.2)',
            borderWidth: 0
        };
        annotation.annotations.leftBorder = {
            type: 'line',
            xMin: startXPosition,
            xMax: startXPosition,
            borderWidth: 2
        };
        annotation.annotations.rightBorder = {
            type: 'line',
            xMin: finishXPosition,
            xMax: finishXPosition,
            borderWidth: 2
        }
        realtimeChart.options.plugins.annotation = annotation;
        isHighlights = true;
    }
});

rtChart.addEventListener('click', (ev) => {
    const chartRect = rtChart.getBoundingClientRect();
    const posX = ev.clientX - chartRect.left;
    const xAxis = realtimeChart.scales.x;
    const valX = xAxis.getValueForPixel(posX);

    const leftHighlightBorder = realtimeChart.options.plugins.annotation.annotations.leftBorder.xMin;
    const rightHighlightBorder = realtimeChart.options.plugins.annotation.annotations.rightBorder.xMin;

    const distanceFromLeftBorder = Math.abs(valX - leftHighlightBorder);
    const distanceFromRightBorder = Math.abs(valX - rightHighlightBorder);

    if (distanceFromLeftBorder <= 1000 || distanceFromRightBorder <= 1000) {
        if (distanceFromLeftBorder > distanceFromRightBorder) {
            isChanging.rightBorder = !isChanging.rightBorder;
            realtimeChart.options.plugins.annotation.annotations.rightBorder.borderWidth =
                realtimeChart.options.plugins.annotation.annotations.rightBorder.borderWidth === 5
                    ? 2
                    : 5;

            if (isChanging.leftBorder) {
                isChanging.leftBorder = false;
                realtimeChart.options.plugins.annotation.annotations.leftBorder.borderWidth = 2;
            }
        } else {
            isChanging.leftBorder = !isChanging.leftBorder;
            realtimeChart.options.plugins.annotation.annotations.leftBorder.borderWidth =
                realtimeChart.options.plugins.annotation.annotations.leftBorder.borderWidth === 5
                    ? 2
                    : 5;

            if (isChanging.rightBorder) {
                isChanging.rightBorder = false;
                realtimeChart.options.plugins.annotation.annotations.rightBorder.borderWidth = 2;
            }
        }
    }
})

rtChart.addEventListener('mousemove', (ev) => {
    const chartRect = rtChart.getBoundingClientRect();
    const posX = ev.clientX - chartRect.left;
    const xAxis = realtimeChart.scales.x;
    const valX = xAxis.getValueForPixel(posX);

    if (isChanging.leftBorder) {
        realtimeChart.options.plugins.annotation.annotations.leftBorder.xMin = valX;
        realtimeChart.options.plugins.annotation.annotations.leftBorder.xMax = valX;
        realtimeChart.options.plugins.annotation.annotations.highlight.xMin = valX;
    } else if (isChanging.rightBorder) {
        realtimeChart.options.plugins.annotation.annotations.rightBorder.xMin = valX;
        realtimeChart.options.plugins.annotation.annotations.rightBorder.xMax = valX;
        realtimeChart.options.plugins.annotation.annotations.highlight.xMax = valX;
    }

    realtimeChart.update('none');
});