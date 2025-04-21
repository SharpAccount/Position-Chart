const max = (datasets) => {
    const maxes = [];
    datasets.forEach(dataset => {
        const data = dataset.data;
        maxes.push(Math.max(...data));
    })
    return Math.max(...maxes);
};
const min = (datasets) => {
    const maxes = [];
    datasets.forEach(dataset => {
        const data = dataset.data;
        maxes.push(Math.min(...data));
    })
    return Math.min(...maxes);
};

export {max, min}