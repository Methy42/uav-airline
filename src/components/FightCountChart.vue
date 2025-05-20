<template>
    <div class="chart-container" ref="containerRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { fontSize } from '../utils';
import LinaChartIcon0 from '../assets/LinaChartIcon-0.png';

const containerRef = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

onMounted(() => {
    chartRef.value = echarts.init(containerRef.value);
    initChart();
});

const initChart = () => {
    chartRef.value?.setOption({
        grid: {
            top: fontSize(15),
            left: fontSize(40),
            right: fontSize(15),
            bottom: fontSize(30)
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: [
                '今日',
                '昨日'
            ]
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#2f4b73'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: fontSize(14)
            },
            data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(55, 145, 207, 0.3)',
                    type: [5, 5]
                }
            },
            axisLabel: {
                align: 'right',
            }
        },
        series: [
            {
                data: [55, 85, 55, 48, 77, 77, 82],
                type: 'line',
                lineStyle: {
                    width: fontSize(2),
                    color: '#23addc'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(35, 173, 220, .5)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(35, 173, 220, 0)'
                        }
                    ])
                }
            },
            {
                data: [38, 24, 77, 65, 43, 69, 31],
                type: 'line',
                lineStyle: {
                    width: fontSize(2),
                    color: '#FFC300'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255, 195, 0, 0.4)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 222, 89, 0)'
                        }
                    ])
                }
            }
        ]
    });
}
</script>
<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>