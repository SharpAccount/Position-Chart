const CSV = {
    parse: (value, separator) => {
        const parsed = value.split('\r\n').map(str => str.split(separator));
        const headers = parsed[0];
        let tickTime = Number(headers[3]);
        const data = parsed.slice(1, -1);
        const res = {
            datasets: [
                {
                    label: 'Позиция x',
                    data: []
                },
                {
                    label: 'Позиция y',
                    data: []
                },
                {
                    label: 'Позиция z',
                    data: []
                },
            ]
        }

        for (const vals of data) {
            for (let i = 0; i < vals.length; i++) {
                res.datasets[i].data.push({
                    x: tickTime,
                    y: Number(vals[i])
                })
            }
            tickTime += 100;
        }

        return res;
    },
    toCSV: (value, separator) => {
        const timestart = value[0].data[0].x;
        const headers = `x${separator}y${separator}z${separator}${timestart}\r\n`;
        const data = []

        for (let i = 0; i < value[0].data.length; i++) {
            data.push(`${value[0].data[i].y}${separator}${value[1].data[i].y}${separator}${value[2].data[i].y}`);
        }

        const stringifiedData = data.join('\r\n');
        return headers + stringifiedData;
    }
}

export default CSV