<template>
    <div class="route-manager-container">
        <ScreenPanel v-if="pageState === 'list'" class="route-table-panel">
            <template #title>飞行任务列表</template>
            <div class="route-table-option">
                <el-button type="primary" :size="'small'" @click="pageState = 'create'">添加无人机</el-button>
            </div>
            <el-table :data="tableData" :size="'small'" border style="width: 100%;">
                <el-table-column prop="types" label="类型" />
                <el-table-column label="起止">
                    <template #default="scope">
                        <span>{{ scope.row.start }} - {{ scope.row.end }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="height" label="高度" />
                <el-table-column label="操作" width="110">
                    <template #default="scope">
                        <el-button type="text" size="small"
                            @click="() => { console.log('编辑', scope.row); }">详情</el-button>
                        <el-button type="text" size="small"
                            @click="() => { console.log('删除', scope.row); }">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </ScreenPanel>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ScreenPanel from './ScreenPanel.vue';

const pageState = ref<'list' | 'create' | 'view' | 'edit'>('list');

const tableData = ref<any[]>([{
    types: '类型1',
    start: '起点1',
    end: '终点1',
    height: 100,
}, {
    types: '类型2',
    start: '起点2',
    end: '终点2',
    height: 200,
}]);
</script>
<style lang="scss" scoped>
.route-manager-container {
    width: 100vw;
    position: relative;
}

.route-table-panel {
    position: absolute;
    top: 120px;
    left: 15px;
    width: 480px;
}

.route-table-option {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>