const rand = (min, max) => {
    return Math.random() * (max - min) + min;
}

const handleRefresh = chart => {
    const now = Date.now();
    chart.data.datasets.forEach(dataset => {
        dataset.data.push({
            x: now,
            y: rand(-100, 100)
        });
    });
};

export default handleRefresh;