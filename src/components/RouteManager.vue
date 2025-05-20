<template>
    <div class="route-manager-container">
        <ScreenPanel v-if="pageState === 'list'" class="route-table-panel">
            <template #title>航线列表</template>
            <div class="route-table-option">
                <el-button type="primary" :size="'small'" @click="showCreatePlane">添加航线</el-button>
            </div>
            <el-table :data="tableData" :size="'small'" border style="width: 100%;">
                <el-table-column prop="types" label="类型">
                    <template #default="scope">
                        <el-tag v-for="type in scope.row.types" type="info">{{routeTypes.find(rt => rt.value ===
                            type)?.label}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="起止">
                    <template #default="scope">
                        <span>{{ scope.row.start.label }} - {{ scope.row.end.label }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="height" label="高度" />
                <el-table-column label="操作" width="110">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="viewRoute(scope.$index)">详情</el-button>
                        <el-button type="text" size="small" @click="deleteRoute(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </ScreenPanel>
        <ScreenPanel v-if="pageState === 'create' || pageState === 'view' || pageState === 'edit'"
            class="route-table-panel">
            <template #title>
                <span v-if="pageState === 'create'">添加航线</span>
                <span v-else-if="pageState === 'view'">航线详情</span>
                <span v-else-if="pageState === 'edit'">编辑航线</span>
            </template>
            <el-form :model="routeFormModel" label-width="auto" style="margin-top: 10px;">
                <el-form-item label="类型">
                    <el-select v-if="pageState === 'create' || pageState === 'edit'" v-model="routeFormModel.types"
                        placeholder="" :multiple="true">
                        <el-option v-for="item in routeTypes" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-tag v-else-if="pageState === 'view'" v-for="type in routeFormModel.types"
                        type="info">{{routeTypes.find(rt => rt.value ===
                            type)?.label}}</el-tag>
                </el-form-item>
                <el-form-item label="起点">
                    <el-select v-if="pageState === 'create' || pageState === 'edit'" v-model="routeStart" filterable
                        remote reserve-keyword placeholder="输入并选择航段起点" :remote-method="searchRouteStart"
                        :loading="searchRouteStartLoading" @change="routeStartChange">
                        <el-option v-for="item in searchRouteStartOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-text v-else-if="pageState === 'view'">{{ origin.label }}</el-text>
                </el-form-item>
                <el-form-item label="终点">
                    <el-select v-if="pageState === 'create' || pageState === 'edit'" v-model="routeEnd" filterable
                        remote reserve-keyword placeholder="输入并选择航段终点" :remote-method="searchRouteEnd"
                        :loading="searchRouteEndLoading" @change="routeEndChange">
                        <el-option v-for="item in searchRouteEndOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-text v-else-if="pageState === 'view'">{{ destination.label }}</el-text>
                </el-form-item>
                <el-form-item label="高度">
                    <el-input-number v-if="pageState === 'create' || pageState === 'edit'"
                        v-model="routeFormModel.height" @change="onNewRouteHeightChange">
                        <template #suffix>
                            <span>米</span>
                        </template>
                    </el-input-number>
                    <el-text v-else-if="pageState === 'view'">{{ routeFormModel.height }}米</el-text>
                </el-form-item>
                <el-form-item v-if="pageState === 'create' || pageState === 'edit'">
                    <el-button type="primary" @click="saveRoute">确定</el-button>
                    <el-button @click="cancelCreate">取消</el-button>
                </el-form-item>
                <el-form-item v-if="pageState === 'view'">
                    <el-button type="primary" @click="() => pageState = 'edit'">编辑</el-button>
                    <el-button @click="() => pageState = 'list'">返回</el-button>
                </el-form-item>
            </el-form>
        </ScreenPanel>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import ScreenPanel from './ScreenPanel.vue';
import { getRandomHexColor } from '../utils';

const pageState = ref<'list' | 'create' | 'view' | 'edit'>('list');
const origin = ref();
const destination = ref();
const routeStart = ref();
const routeEnd = ref();
const searchRouteStartLoading = ref<boolean>(false);
const searchRouteEndLoading = ref<boolean>(false);
const searchRouteStartOptions = ref<Array<any>>([]);
const searchRouteEndOptions = ref<Array<any>>([]);
const currentRouteIndex = ref<number>();

let newPolyline: any = null;
let newLocationList: Array<any> = [];
const routePolylines: any[] = [];
const routeTexts: any[] = [];

const tableData = ref<any[]>([]);

const routeTypes = ref([
    { label: '快递物流', value: 'ExpressLogistics' },
    { label: '应急响应', value: 'EmergencyResponse' },
    { label: '载人航线', value: 'MannedFlight' },
    { label: '城市巡检', value: 'UrbanInspection' },
]);

const routeFormModel = ref({
    name: '',
    types: [],
    start: '',
    end: '',
    height: 50,
});

onMounted(() => {
    newPolyline = new (window as any).GlobalAMap.Polyline({
        strokeWeight: 6, //线条宽度
        lineJoin: "round", //折线拐点连接处样式
        height: routeFormModel.value.height
    });
    loadRouteList();
    loadRouteOnMap();
});

onUnmounted(() => {
    (window as any).GlobalMap.remove(newPolyline);
    newPolyline.setPath([]);
    routePolylines.forEach((polyline) => {
        (window as any).GlobalMap.remove(polyline);
    });
    routePolylines.length = 0;
    routeTexts.forEach((routeText) => {
        routeText.remove();
        (window as any).GlobalMap.remove(routeText);
    });
    routeTexts.length = 0;
});

const searchByName = (keywords: string) => {
    return fetch(`https://restapi.amap.com/v5/place/text?key=${(window as any).webapiKey}&region=乌鲁木齐市&keywords=${keywords}`);
}

const searchRouteStart = (query: string) => {
    if (query) {
        searchRouteStartLoading.value = true
        searchByName(query).then(result => {
            result.json().then(json => {
                searchRouteStartOptions.value = json.pois.map((poi: any) => ({
                    value: poi.id,
                    label: poi.name,
                    location: poi.location
                }));
            });

            searchRouteStartLoading.value = false;
        }).catch(() => {
            searchRouteStartLoading.value = false;
        });
    } else {
        searchRouteStartOptions.value = []
    }
};

const searchRouteEnd = (query: string) => {
    if (query) {
        searchRouteEndLoading.value = true
        searchByName(query).then(result => {
            result.json().then(json => {
                searchRouteEndOptions.value = json.pois.map((poi: any) => ({
                    value: poi.id,
                    label: poi.name,
                    location: poi.location
                }));
            });

            searchRouteEndLoading.value = false;
        }).catch(() => {
            searchRouteEndLoading.value = false;
        });
    } else {
        searchRouteEndOptions.value = []
    }
};

const routeStartChange = (value: any) => {
    const selectOption = searchRouteStartOptions.value.find(option => option.value == value);
    origin.value = selectOption;

    if (origin.value && destination.value) {
        generatePath();
    }
}

const routeEndChange = (value: any) => {
    const selectOption = searchRouteEndOptions.value.find(option => option.value == value);
    destination.value = selectOption;

    if (origin.value && destination.value) {
        generatePath();
    }
}

const routing = () => {
    return fetch(`https://restapi.amap.com/v3/direction/walking?key=${(window as any).webapiKey}&origin=${origin.value.location}&destination=${destination.value.location}&origin_id=${routeStart.value}&destination_id=${routeEnd.value}`);
}

const generatePath = () => {
    routing().then(result => {
        result.json().then((json) => {
            (window as any).GlobalMap.remove(newPolyline);
            newPolyline.setPath([]);
            newPolyline = new (window as any).GlobalAMap.Polyline({
                strokeWeight: 6, //线条宽度
                lineJoin: "round", //折线拐点连接处样式
                height: routeFormModel.value.height
            });
            newLocationList = [];
            console.log("generatePath", json);
            json.route.paths[0]?.steps.forEach((step: any) => {
                (step.polyline as string).split(';').forEach(position => {
                    const lnglat: string[] = position.split(',');
                    newLocationList.push(lnglat);
                });
            });

            newPolyline.setPath(newLocationList);
            (window as any).GlobalMap.add(newPolyline);
        });
    });
}

const onNewRouteHeightChange = () => {
    if (origin.value && destination.value) {
        generatePath();
    }
}

const saveRoute = () => {
    const routeMapCache = localStorage.getItem('routeMapCache');
    const routeList: any[] = routeMapCache ? JSON.parse(routeMapCache) : [];

    if (pageState.value === 'create') {
        routeList.push({
            routeTypes: routeFormModel.value.types,
            routeStart: origin.value,
            routeEnd: destination.value,
            routeHeight: routeFormModel.value.height,
            locationList: newLocationList,
        });
    } else if (pageState.value === 'edit' && currentRouteIndex.value !== undefined) {
        routeList[currentRouteIndex.value] = {
            routeTypes: routeFormModel.value.types,
            routeStart: origin.value,
            routeEnd: destination.value,
            routeHeight: routeFormModel.value.height,
            locationList: newLocationList,
        };
    }

    localStorage.setItem('routeMapCache', JSON.stringify(routeList));
    loadRouteList();

    pageState.value = "list";

    routeFormModel.value = {
        name: '',
        types: [],
        start: '',
        end: '',
        height: 50,
    };

    (window as any).GlobalMap.remove(newPolyline);
    newPolyline.setPath([]);
}

const loadRouteList = () => {
    tableData.value = [];
    const routeMapCache = localStorage.getItem('routeMapCache');
    if (routeMapCache) {
        const routeList: any[] = JSON.parse(routeMapCache);
        routeList.forEach((route: any) => {
            tableData.value.push({
                types: route.routeTypes,
                start: route.routeStart,
                end: route.routeEnd,
                height: route.routeHeight
            });
        });
        console.log("loadRouteList", routeList);
    }
}

const deleteRoute = (index: number) => {
    const routeMapCache = localStorage.getItem('routeMapCache');
    if (routeMapCache) {
        const routeList: any[] = JSON.parse(routeMapCache);
        routeList.splice(index, 1);
        localStorage.setItem('routeMapCache', JSON.stringify(routeList));
        loadRouteList();
    }
}

const loadRouteOnMap = () => {
    const routeMapCache = localStorage.getItem('routeMapCache');
    routePolylines.forEach((polyline) => {
        (window as any).GlobalMap.remove(polyline);
    });
    routeTexts.forEach((routeText) => {
        routeText.remove();
        (window as any).GlobalMap.remove(routeText);
    });
    routePolylines.length = 0;
    routeTexts.length = 0;
    (window as any).GlobalMap.remove(newPolyline);
    newPolyline.setPath([]);
    if (routeMapCache) {
        const routeList: any[] = JSON.parse(routeMapCache);

        routeList.forEach((route) => {
            const polyline = new (window as any).GlobalAMap.Polyline({
                strokeWeight: 6, //线条宽度
                lineJoin: "round", //折线拐点连接处样式
                height: route.routeHeight,
                strokeColor: getRandomHexColor(),
            });

            polyline.setPath(route.locationList);
            (window as any).GlobalMap.add(polyline);
            routePolylines.push(polyline);

            const startRouteText = new (window as any).GlobalAMap.Text({
                position: route.locationList[0],
                anchor: 'bottom-center',
                text: route.routeStart.label,
                style: {'background-color':'#333'},
                height: route.routeHeight,
            });
            (window as any).GlobalMap.add(startRouteText);
            routeTexts.push(startRouteText);

            const endRouteText = new (window as any).GlobalAMap.Text({
                position: route.locationList[route.locationList.length - 1],
                anchor: 'bottom-center',
                text: route.routeEnd.label,
                style: {'background-color':'#333'},
                height: route.routeHeight,
            });
            (window as any).GlobalMap.add(endRouteText);
            routeTexts.push(endRouteText);
        });
    }
}

const viewRoute = (index: number) => {
    currentRouteIndex.value = index;
    const routeMapCache = localStorage.getItem('routeMapCache');
    routePolylines.forEach((polyline) => {
        (window as any).GlobalMap.remove(polyline);
    });
    routePolylines.length = 0;
    (window as any).GlobalMap.remove(newPolyline);
    newPolyline.setPath([]);
    if (routeMapCache) {
        const routeList: any[] = JSON.parse(routeMapCache);
        const route = routeList[index];

        routeFormModel.value.types = route.routeTypes;
        routeFormModel.value.start = route.routeStart;
        routeFormModel.value.end = route.routeEnd;
        routeFormModel.value.height = route.routeHeight;
        origin.value = route.routeStart;
        destination.value = route.routeEnd;
        routeStart.value = route.routeStart.value;
        routeEnd.value = route.routeEnd.value;
        searchRouteStartOptions.value = [route.routeStart];
        searchRouteEndOptions.value = [route.routeEnd];
    }
    pageState.value = "view";
}

const showCreatePlane = () => {
    pageState.value = "create";
    routePolylines.forEach((polyline) => {
        (window as any).GlobalMap.remove(polyline);
    });
    routePolylines.length = 0;
    (window as any).GlobalMap.remove(newPolyline);
    newPolyline.setPath([]);
}

const cancelCreate = () => {
    pageState.value = "list";
    routePolylines.forEach((polyline) => {
        (window as any).GlobalMap.remove(polyline);
    });
    routePolylines.length = 0;
    (window as any).GlobalMap.remove(newPolyline);
    newPolyline.setPath([]);
}
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
