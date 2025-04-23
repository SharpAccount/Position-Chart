import chart from '../Helpers/chart.js'
import CSV from "../Helpers/CSV.js";
import fileTypes from "../consts/fileTypes.js";

const importForm = document.getElementById('chartInpt');
const lnChart = document.getElementById('lnChart');
const nothingReport = document.getElementById('nothingReport');

const reader = new FileReader();

let currentChart = null;
let data = {};

const showChart = (event) => {
    const res = event.target.files[0];
    reader.addEventListener(
        "load",
        () => {
            if (res.type === fileTypes.json) {
                data = JSON.parse(reader.result);
            } else {
                data = CSV.parse(reader.result, ';');
            }

            if (currentChart) {
                currentChart.data = data;
            } else {
                currentChart = chart.linear(lnChart, data);
                nothingReport.classList.remove('visible');
                nothingReport.classList.add('invisible');
            }
            currentChart.update()
        },
        false,
    );
    reader.readAsText(res);
}

importForm.addEventListener('input', showChart);