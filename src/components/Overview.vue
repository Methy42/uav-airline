<template>
    <div class="overview-container">
        <ScreenPanel class="route-overview">
            <template #title>航线总览</template>
            <RouteOverviewChart class="route-overview-chart" />
        </ScreenPanel>
        <ScreenPanel class="today-flight-statistics">
            <template #title>今日飞行统计</template>
            <div class="today-flight-statistics-content">
                <CountCard>
                    <template #title>飞行次数</template>
                    <template #count>100</template>
                </CountCard>
                <CountCard>
                    <template #title>飞行时间</template>
                    <template #count>80</template>
                </CountCard>
                <CountCard>
                    <template #title>飞行里程</template>
                    <template #count>230</template>
                </CountCard>
                <CountCard>
                    <template #title>平均速度</template>
                    <template #count>20</template>
                </CountCard>
            </div>
            <FightCountChart class="flight-count-chart" />
        </ScreenPanel>
        <ScreenPanel class="ground-facility-statistics">
            <template #title>地面设施统计</template>
            <div class="today-flight-statistics-content">
                <CountCard :color="'#FFC300'">
                    <template #title>机场</template>
                    <template #count>100</template>
                </CountCard>
                <CountCard :color="'#FFC300'">
                    <template #title>气象站</template>
                    <template #count>80</template>
                </CountCard>
                <CountCard :color="'#FFC300'">
                    <template #title>信号站</template>
                    <template #count>230</template>
                </CountCard>
            </div>
            <GroundFacilitiesChart class="ground-facilities-chart" />
        </ScreenPanel>
        <ScreenPanel class="uav-overview">
            <template #title>无人机统计</template>
            <div class="statistic-card">
                <el-statistic :value="152">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            无人机总数
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <el-progress :percentage="50" :show-text="false" :striped="true" :striped-flow="true" />
                </div>
            </div>
            <div class="today-flight-statistics-content">
                <CountCard :color="'#fd91d6'">
                    <template #title>快递</template>
                    <template #count>100</template>
                </CountCard>
                <CountCard :color="'#fd91d6'">
                    <template #title>物流</template>
                    <template #count>80</template>
                </CountCard>
                <CountCard :color="'#fd91d6'">
                    <template #title>载人客运</template>
                    <template #count>230</template>
                </CountCard>
                <CountCard :color="'#fd91d6'">
                    <template #title>外卖</template>
                    <template #count>230</template>
                </CountCard>
            </div>
        </ScreenPanel>
        <ScreenPanel class="real-time-flight-events">
            <template #title>实时飞行事件</template>
            <ListMiniCard style="margin-top: 10px;">
                <template #header>进行中</template>
                <template #content>
                    <div class="progress-list">
                        <div class="progress-list-item">
                            <div class="event-id">KD334455</div>
                            <div class="event-type">物流派送</div>
                            <div class="event-time">5月9日 11:30</div>
                        </div>
                        <div class="progress-list-item">
                            <div class="event-id">KD334455</div>
                            <div class="event-type">物流派送</div>
                            <div class="event-time">5月9日 11:30</div>
                        </div>
                        <div class="progress-list-item">
                            <div class="event-id">KD334455</div>
                            <div class="event-type">物流派送</div>
                            <div class="event-time">5月9日 11:30</div>
                        </div>
                    </div>
                </template>
            </ListMiniCard>
            <ListMiniCard>
                <template #header>已完成</template>
                <template #content>
                    <div class="progress-list">
                        <div class="progress-list-item">
                            <div class="event-id" style="color: #FFC300;">KD334455</div>
                            <div class="event-type">物流派送</div>
                            <div class="event-time">5月9日 11:30</div>
                        </div>
                    </div>
                </template>
            </ListMiniCard>
            <ListMiniCard>
                <template #header>任务终止</template>
                <template #content>
                    <div class="progress-list">
                        <div class="progress-list-item">
                            <div class="event-id" style="color: #fd91d6;">KD334455</div>
                            <div class="event-type">物流派送</div>
                            <div class="event-time">5月9日 11:30</div>
                        </div>
                    </div>
                </template>
            </ListMiniCard>
        </ScreenPanel>
        <ScreenPanel class="airspace-violation-incidents">
            <template #title>空域违规事件</template>
            <el-timeline style="margin-top: 15px;">
                <el-timeline-item :timestamp="new Date().toLocaleString()" placement="top">
                    <span style="color: #00b3ff;">KD334455</span>偏移规定航线，请及时处理！
                </el-timeline-item>
                <el-timeline-item :timestamp="new Date().toLocaleString()" placement="top">
                    <span style="color: #00b3ff;">KD334455</span>偏移规定航线，请及时处理！
                </el-timeline-item>
            </el-timeline>
        </ScreenPanel>
    </div>
</template>
<script lang="ts" setup>
import ScreenPanel from './ScreenPanel.vue';
import RouteOverviewChart from './RouteOverviewChart.vue';
import CountCard from './CountCard.vue';
import FightCountChart from './FightCountChart.vue';
import GroundFacilitiesChart from './GroundFacilitiesChart.vue';
import ListMiniCard from './ListMiniCard.vue';
</script>
<style lang="scss" scoped>
.overview-container {
    width: 100vw;
    position: relative;
}

.route-overview {
    position: absolute;
    top: 120px;
    left: 15px;
    width: 300px;
}

.route-overview-chart {
    height: 180px;
}

.today-flight-statistics {
    position: absolute;
    top: 120px;
    right: 15px;
    width: 300px;
}

.today-flight-statistics-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
}

.flight-count-chart {
    margin-top: 10px;
    width: 100%;
    height: 200px;
}

.ground-facility-statistics {
    position: absolute;
    top: 365px;
    left: 15px;
    width: 300px;
}

.ground-facilities-chart {
    margin-top: 10px;
    width: 100%;
    height: 125px;
}

.uav-overview {
    position: absolute;
    top: 465px;
    right: 15px;
    width: 300px;
}

.statistic-card {
    height: 100%;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
    margin-top: 15px;
}

.statistic-footer {
    margin-top: 10px;
    margin-bottom: 10px;
}

.real-time-flight-events {
    top: 633px;
    left: 15px;
    width: 300px;
}

.progress-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.progress-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.event-id {
    font-size: 14px;
    color: #00b3ff;
    flex-shrink: 0;
    margin-right: 5px;
}

.event-type {
    font-size: 14px;
    color: #fff;
    flex-grow: 1;
}

.event-time {
    font-size: 14px;
    color: #fff;
    flex-shrink: 0;
}

.airspace-violation-incidents {
    position: absolute;
    top: 709px;
    right: 15px;
    width: 300px;
}
</style>
