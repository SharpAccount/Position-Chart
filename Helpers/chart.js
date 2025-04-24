(function(window){
    var Chart = window.Chart;

    window.chart = window.chart || {};

    var Zoom = window.ChartZoom;
    var Annotation = window["chartjs-plugin-annotation"];
    var StreamingPlugin = window.ChartStreaming;
    var CategoryScale = Chart.CategoryScale;
    var TimeScale = Chart.TimeScale;
    var LineController = Chart.LineController;
    var LineElement = Chart.LineElement;
    var PointElement = Chart.PointElement;
    var LinearScale = Chart.LinearScale;
    var Title = Chart.Title;
    var Tooltip = Chart.Tooltip;
    var Legend = Chart.Legend;

    function realtime(element, handleRefresh) {
            Chart.register(
                Zoom,
                StreamingPlugin,
                LineController,
                LineElement,
                PointElement,
                LinearScale,
                Title,
                Tooltip,
                Legend,
                Annotation
            );
            return new Chart(element.getContext('2d'), {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label:'Позиция x',
                            data:[],
                            tension:.1,
                            backgroundColor:'rgba(255,0,0,1)',
                            borderColor:'rgba(255,0,0,1)'
                        },
                        {
                            label:'Позиция y',
                            data:[],
                            tension:.1,
                            backgroundColor:'rgba(0,255,0,1)',
                            borderColor:'rgba(0,255,0,1)'
                        },
                        { label:'Позиция z',
                            data:[],
                            tension:.1,
                            backgroundColor:'rgba(0,0,255,1)',
                            borderColor:'rgba(0,0,255,1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: { x: { type:'realtime', realtime:{ duration:15000, refresh:100, delay:500, pause:true, onRefresh:handleRefresh } } },
                    plugins:{ zoom:{ zoom:{ wheel:{enabled:true}, pinch:{enabled:true}, mode:'x' }, pan:{enabled:true,mode:'x'} } }
                }
            });
    }

    function linear(element, data) {
        Chart.register(
            Zoom,
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
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'millisecond',
                                displayFormats: {
                                    millisecond: 'HH:mm:ss.SSS'
                                }
                            },
                            ticks: {
                                source: 'data',
                                autoSkip: true
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
                },
            }
        );
    }

    window.chart.realtime = realtime;
    window.chart.linear = linear;
})(window);