<template>
    <el-card style="width: 480px">
        <template #header>
            <div class="card-header">
                <span>航段列表</span>
            </div>
        </template>
        <el-table :data="routeListData" border stripe size="small" style="width: 100%">
            <el-table-column prop="routeName" label="航段名称" width="180" />
            <el-table-column prop="routeHeight" label="航段高度(米)" width="100" />
            <el-table-column prop="routeStatus" label="状态" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                    <el-button link type="primary" size="small">查看</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const routeListData = ref<any[]>([]);

const polylineList: any[] = [];

const CommonColors: string[] = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#008000',
    '#000080',
    '#808080',
    '#FFC0CB',
    '#FFD700',
    '#ADFF2F',
    '#FF4500',
    '#FF69B4',
    '#FF1493',
    '#00BFFF',
    '#1E90FF',
    '#00FF7F',
    '#32CD32',
    '#FF6347',
    '#FF8C00',
    '#FF00FF',
    '#7FFF00',
    '#00CED1',
    '#4682B4',
    '#D2691E',
    '#8A2BE2',
];

onMounted(() => {
    // Mock data for route list
    loadRouteListData();
});

const loadRouteListData = () => {
    const routeMapStringCache = localStorage.getItem('routeMapCache');
    if (routeMapStringCache) {
        const routeMapCache = JSON.parse(routeMapStringCache);
        routeListData.value = routeMapCache.map((item: any, index: number) => {
            const polyline = new (window as any).GlobalAMap.Polyline({
                strokeWeight: 6, //线条宽度
                lineJoin: "round", //折线拐点连接处样式
                height: item.routeHeight,
                showDir: true,
                strokeColor: CommonColors[index % CommonColors.length],
            });

            return {
                routeName: item.routeName,
                routeHeight: item.routeHeight,
                routeStatus: item.routeStatus,
            };
        });
    }
}
</script>
<style></style>
