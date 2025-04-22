const CSV = {
    parse: (value, separator) => {
        // const parsed = value.split('\r\n').map(str => str.split(separator));
        // const headers = parsed[0];
        // const data = parsed.slice(1, -1);
        // const res = {
        //     datasets: []
        // }
        // for (const vals of data) {
        //     for (let i = 0; i < vals.length; i++) {
        //
        //     }
        // }
    },
    toCSV: (value, separator) => {
        const timestart = value[0].data[0].x;
        const headers = `x${separator}y${separator}${timestart}\r\n`;

        const data = value
            .map(info => info.data
                .map(data => `${data.x}${separator}${data.y}\r\n`)
                    .join(''))
            .join('');
        return headers + data;
    }
}

export default CSV