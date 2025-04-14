import {
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip
} from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import 'chartjs-adapter-luxon'
import {RealTimeScale, StreamingPlugin} from "chartjs-plugin-streaming";

const chart = {
    linear: (element, data) => {
        Chart.register(
            Zoom,
            StreamingPlugin,
            RealTimeScale,
            LineController,
            LineElement,
            PointElement,
            LinearScale,
            Title,
            Tooltip,
            Legend,
            TimeScale,
            CategoryScale
        );
        return new Chart(
            element.getContext('2d'),
            {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    transitions: {
                        zoom: {
                            animation: {
                                duration: 0
                            }
                        }
                    }
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'x',
                        },
                        pan: {
                            enabled: true,
                            mode: 'x'
                        }
                    },
                }
            });
    },
    realtime: (element, refreshFunc) => {
        Chart.register(
            Zoom,
            StreamingPlugin,
            RealTimeScale,
            LineController,
            LineElement,
            PointElement,
            LinearScale,
            Title,
            Tooltip,
            Legend,
            TimeScale
        );

        return new Chart(
            element.getContext('2d'),
            {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Позиция x',
                            backgroundColor: 'rgba(255, 0, 0, 1)',
                            borderColor: 'rgba(255, 0, 0, 1)',
                            data: [],
                            tension: 0.1
                        },
                        {
                            label: 'Позиция y',
                            backgroundColor: 'rgba(0, 255, 0, 1)',
                            borderColor: 'rgba(0, 255, 0, 1)',
                            data: [],
                            tension: 0.1
                        },
                        {
                            label: 'Позиция z',
                            backgroundColor: 'rgba(0, 0, 255, 1)',
                            borderColor: 'rgba(0, 0, 255, 1)',
                            data: [],
                            tension: 0.1
                        },
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'realtime',
                            realtime: {
                                duration: 15000,
                                refresh: 100,
                                delay: 500,
                                onRefresh: refreshFunc,
                                pause: true,
                                ttl: 50000
                            },
                            time: {
                                parser: 'HH:mm:ss.SSS',
                                tooltipFormat: 'HH:mm:ss.SSS',
                                displayFormats: {
                                    millisecond: 'HH:mm:ss.SSS',
                                    second: 'HH:mm:ss',
                                    minute: 'HH:mm',
                                    hour: 'HH:mm',
                                }
                            }
                        }
                    },
                    transitions: {
                        zoom: {
                            animation: {
                                duration: 0
                            }
                        },
                        show: {
                            type: 'boolean',
                            duration: 0
                        },
                        hide: {
                            type: 'boolean',
                            duration: 0
                        }
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true,
                                },
                                mode: 'x',
                            },
                            pan: {
                                enabled: true,
                                mode: 'x'
                            },
                            // limits: {
                            //     x: {
                                    // minDelay: 500,
                                    // maxDelay: 15000,
                                    // maxDuration: 15000
                            //     }
                            // }
                        },
                    }
                }
            }
        );
    }
}

export default chart;