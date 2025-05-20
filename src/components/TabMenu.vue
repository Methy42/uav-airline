<template>
    <div class="tab-menu-container">
        <TabMenuButton
            v-for="(button, index) in tabButtons"
            :key="index"
            :active="props.activeIndex === index"
            @click="handleTabChange(index)"
        >
            <template #icon>
                <img :src="button.icon" alt="" />
            </template>
            <template #label>
                {{ button.label }}
            </template>
        </TabMenuButton>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import TabMenuButton from './TabMenuButton.vue';
import OverviewIcon from '../assets/button-icon/运营总览.png';
import RouteIcon from '../assets/button-icon/航线.png';
import DroneIcon from '../assets/button-icon/无人机.png';
import GroundFacilitiesIcon from '../assets/button-icon/机场.png';
import FlightTaskIcon from '../assets/button-icon/导航.png';
import EventViewIcon from '../assets/button-icon/目录、列表、更多、list.png';

const props = defineProps({
    activeIndex: {
        type: Number,
        default: 0
    }
});
const emit = defineEmits(['changeTab']);
const handleTabChange = (index: number) => {
    console.log('Tab changed to index:', index);
    
    emit('changeTab', index);
};
const tabButtons = [
    { icon: OverviewIcon, label: '总览' },
    { icon: RouteIcon, label: '航线管理' },
    { icon: DroneIcon, label: '无人机管理' },
    { icon: GroundFacilitiesIcon, label: '地面设施管理' },
    { icon: FlightTaskIcon, label: '飞行任务管理' },
    { icon: EventViewIcon, label: '事件查看' }
];
</script>



<style scoped>
.tab-menu-container {
    width: 640px;
    height: 100px;
    background-color: rgba(255, 255, 255, .4);
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
