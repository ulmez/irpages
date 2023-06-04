<script>
import { Bar } from 'vue-chartjs';

export default {
    name: 'CanvasGeneric',
    props: {
        color: {
            type: String,
            default: '#000000',
        },
        values: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    extends: Bar,
    data() {
        return {
            chartData: {
                labels: this.values.map((v) => v.period),
                datasets: [{
                    // barPercentage: 0.8,
                    label: 'Portfolio Valuation',
                    data: this.values.map((v) => v.value),
                    fill: true,
                    // borderColor: '#2554FF',
                    backgroundColor: this.color,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true,
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            fontSize: 6,
                            fontColor: this.color,
                            padding: -6,
                        }
                    }]
                },
                legend: {
                    display: false,
                    labels: {
                        boxWidth: 0,
                        fontFamily: 'Verdana',
                        fontSize: 10,
                        fontStyle: 'bold',
                        fontColor: 'blue',
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.values)));

        // this.chartData.labels = this.periods;
        // this.chartData.datasets.data = this.datas;

        // window.addEventListener('resize', this.onResize);

        this.renderChart(this.chartData, this.options);
    },
    // beforeDestroy() {
    //     window.removeEventListener('resize', this.onResize);
    // },
    // methods: {
    //     onResize() {
    //         this.renderChart(this.chartData, this.options);
    //     },
    // },
}
</script>

<style scoped>

</style>
