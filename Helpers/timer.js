const Timer = () => {
    const time = {
        seconds: 0,
        minutes: 0,
        hours: 0
    };

    return {
        addSecond: () => {
            if (time.seconds + 1 === 60) {
                if (time.minutes + 1 === 60) {
                    time.hours++;
                    time.minutes = 0;
                } else {
                    time.minutes++;
                    time.seconds = 0;
                }
            } else {
                time.seconds++;
            }
            return `${
                time.hours < 10
                    ? '0' + time.hours : time.hours
            }:${
                time.minutes < 10
                    ? '0' + time.minutes : time.minutes}:${
                time.seconds < 10
                    ? '0' + time.seconds : time.seconds}`
        },
        clearTime: () => {
            time.seconds = 0;
            time.minutes = 0;
            time.hours = 0;
            return `00:00:00`;
        }
    }
}

const timeHandler = Timer();

export default timeHandler