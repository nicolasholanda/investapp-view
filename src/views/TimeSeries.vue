<template>
    <div>
        <div v-show="!loading && !error">
            <div class="md-layout md-alignment-center-center md-gutter" style="margin: 0 16px">
                <div class="md-layout-item md-size-3x" v-for="interval in intervals" :key="interval.id">
                    <md-button v-bind:class="getIntervalClass(interval)" @click="currentInterval = interval.id">
                        {{interval.name}}
                    </md-button>
                </div>
            </div>
            <md-card>
                <div class="equity_info">
                    <div class="md-layout">
                        <div class="md-layout-item">
                            <span class="md-title">{{equity.previous_close}}</span>
                            <span class="md-body-2"
                                  v-bind:style="[equity.change < 0 ? {color: 'rgb(222,69,69)'} : {color: 'rgb(67,144,67)'}]"
                                  style="padding-left: 10px;">
                                {{equity.change}} ({{equity.change_percent}})
                            </span>
                        </div>
                        <div class="md-layout-item" style="text-align: right">
                            <span class="md-title">{{equity.symbol}}</span>
                        </div>
                    </div>
                    <div class="md-layout">
                        <div class="md-layout-item">
                            <span class="md-caption">{{equity.latest_trading_day | formatDate}}</span>
                        </div>
                    </div>
                </div>

                <div style="height: 320px;" id="chart_container"></div>

                <div class="md-layout md-gutter equity_info md-alignment-center-space-between">
                    <div class="md-layout-item md-size-20" style="text-align: center">
                        <span class="md-body-2" style="font-weight: bold">Abertura: </span>
                        <span class="md-body-2">{{equity.open}}</span>
                    </div>
                    <div class="md-layout-item md-size-20" style="text-align: center">
                        <span class="md-body-2" style="font-weight: bold">Alta: </span>
                        <span class="md-body-2">{{equity.high}}</span>
                    </div>
                    <div class="md-layout-item md-size-20" style="text-align: center">
                        <span class="md-body-2" style="font-weight: bold">Baixa: </span>
                        <span class="md-body-2">{{equity.low}}</span>
                    </div>
                </div>
            </md-card>
        </div>

        <div id="spinner" v-show="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <div id="errorMessage" v-show="error">
            <h1>{{errorMessage}}</h1>
            <a @click="fetchTimeSeries(currentInterval)">Tentar novamente.</a>
        </div>
    </div>
</template>

<script>
    import {getTimeSeries as getTimeSeries} from "../services/stockExchangeService"
    import {getGlobalQuote as getGlobalQuote} from "../services/stockExchangeService"
    import Highcharts from "highcharts"
    import {getErrorMessage as getErrorMessage} from "@/utils/errorUtil";

    export default {
        name: "TimeSeries",
        props: [
            "symbol"
        ],
        data() {
             return {
                 intervals: [
                     {
                         id: "1D",
                         name: "Um dia"
                     }, {
                         id: "5D",
                         name: "5 dias",
                     }, {
                         id: "1M",
                         name: "1 mês",
                     }, {
                         id: "6M",
                         name: "6 meses",
                     }, {
                         id: "1Y",
                         name: "Um ano",
                     }, {
                         id: "5Y",
                         name: "5 anos",
                     }
                 ],
                 loading: true,
                 error: false,
                 errorMessage: "Ocorreu um erro.",
                 currentInterval: "1D",
                 timeSeries: {},
                 equity: {},
                 chart: null
             }
        },
        methods: {
            getIntervalClass(interval) {
                return interval.id === this.currentInterval ? "md-raised md-primary" : "";
            },
            fetchEquity() {
                let promise = getGlobalQuote(this.symbol);
                promise.then(response => {
                    this.equity = response.data;
                    this.setChart()
                    this.error = false;
                    this.loading = false;
                }, error => {
                    this.setError(error.response?.data)
                })
            },
            fetchTimeSeries(interval) {
                this.loading = true;
                this.error = false;

                let promise = getTimeSeries(this.symbol, interval);
                promise.then(response => {
                    this.timeSeries = response.data;
                    this.fetchEquity()
                }, error => {
                    this.setError(error.response?.data)
                })
            },
            setError(error) {
                this.error = true;
                this.loading = false;
                this.errorMessage = getErrorMessage(error?.code);
            },
            setChart() {
                let data = [];

                this.timeSeries.items.map(item => {
                    data.push({x: item.timestamp, y: item.close})
                })

                const colorCode = this.equity.change < 0 ? 8 : 2

                Highcharts.chart("chart_container", {
                    chart: {
                        zoomType: "x"
                    },
                    title: {
                        text: null
                    },
                    subtitle: {
                        text: "Clique no gráfico e arraste para aplicar zoom."
                    },
                    xAxis: {
                        type: "datetime"
                    },
                    yAxis: {
                        title: {
                            text: "Fechamento ($)"
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[colorCode]],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[colorCode]).setOpacity(0).get("rgba")]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: "area",
                        name: this.equity.symbol,
                        data: data,
                        lineColor: Highcharts.getOptions().colors[colorCode],
                        color: Highcharts.getOptions().colors[colorCode],
                    }]
                });
            }
        },
        created() {
            this.fetchTimeSeries(this.currentInterval)
        },
        watch: {
            currentInterval() {
                this.fetchTimeSeries(this.currentInterval)
            },
            symbol() {
                this.fetchTimeSeries(this.currentInterval)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #errorMessage {
        justify-content: center;
        margin-top: 30vh;
    }

    #spinner {
        display: flex;
        justify-content: center;
        margin-top: 30vh;
    }

    #errorMessage h1 {
        margin: 20px auto;
        text-align: center;
    }

    #errorMessage a {
        display: block;
        text-align: center;
        cursor: pointer;
    }

    .equity_info {
        padding: 10px 15px;
    }

    .equity_info span {
        vertical-align: bottom;
    }
</style>
