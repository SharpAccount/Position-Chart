import chart from '../Helpers/chart.js'
import CSV from "../Helpers/CSV.js";

const importForm = document.getElementById('chartInpt');
const lnChart = document.getElementById('lnChart');
const nothingReport = document.getElementById('nothingReport');

const reader = new FileReader();

let currentChart = null;

const showChart = (event) => {
    const res = event.target.files[0];
    reader.addEventListener(
        "load",
        () => {
            if (res.type === 'application/json') {
              const data = JSON.parse(reader.result);
                if (currentChart) {
                    currentChart.data = data;
                } else {
                    currentChart = chart.linear(lnChart, data);
                    nothingReport.classList.remove('visible');
                    nothingReport.classList.add('invisible');
                }
                currentChart.update()
            } else {
                const parsed = reader.result.split('\r').map(str => str.split(';'))
                CSV.parse(reader.result, ';')
            }
        },
        false,
    );
    reader.readAsText(res);
}

importForm.addEventListener('input', showChart);