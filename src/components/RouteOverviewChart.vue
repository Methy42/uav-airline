<template>
    <div class="chart-container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { fontSize } from '../utils';

const containerRef = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

onMounted(() => {
    chartRef.value = echarts.init(containerRef.value);
    initChart();

    window.addEventListener('reset', onWindowResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
})

const onWindowResize = () => {
    chartRef.value?.resize();
}

const initChart = () => {
    chartRef.value?.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'center',
            right: '0%',
            orient: 'vertical',
            textStyle: {
                color: '#fff',
            }
        },
        series: [
            {
                name: '航线数量',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['25%', '50%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: fontSize(20),
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '快递物流' },
                    { value: 735, name: '应急响应' },
                    { value: 580, name: '载人航线' },
                    { value: 484, name: '城市巡检' }
                ]
            }
        ]
    });
}
</script>
<style lang="scss" scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
.chart-container {
    padding: 0px !important;
}
</style>
