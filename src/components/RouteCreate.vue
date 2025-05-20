<template>
    <el-card style="max-width: 360px">
        <template #header>
            <div class="card-header">
                <span>新增航线</span>
            </div>
        </template>
        <el-form label-width="auto">
            <el-form-item label="航段名称">
                <el-input v-model="routeName" placeholder="" />
            </el-form-item>
            <el-form-item label="航段高度">
                <el-input-number v-model="routeHeight" :min="0" :max="500" />
            </el-form-item>
            <el-form-item label="航段起点">
                <el-select v-model="routeStart" filterable remote reserve-keyword placeholder="输入并选择航段起点"
                    :remote-method="searchRouteStart" :loading="searchRouteStartLoading" @change="routeStartChange"
                    style="width: 240px">
                    <el-option v-for="item in searchRouteStartOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="航段终点">
                <el-select v-model="routeEnd" filterable remote reserve-keyword placeholder="输入并选择航段终点"
                    :remote-method="searchRouteEnd" :loading="searchRouteEndLoading" @change="routeEndChange"
                    style="width: 240px">
                    <el-option v-for="item in searchRouteEndOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="success" @click="saveRoute">保存</el-button>
            <el-button @click="generatePath">生成路径</el-button>
            <el-button @click="simulatedFlight">模拟飞行</el-button>
        </template>
    </el-card>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const routeHeight = ref<number>(50);
const routeName = ref<string>('');
const routeStart = ref();
const origin = ref();
const destination = ref();
const routeEnd = ref();
const searchRouteStartLoading = ref<boolean>(false);
const searchRouteEndLoading = ref<boolean>(false);
const searchRouteStartOptions = ref<Array<any>>([]);
const searchRouteEndOptions = ref<Array<any>>([]);
const emit = defineEmits(['daohang']);

let polyline: any = null;
let locationList: Array<any> = [];

let currentIndex = 0;
let animationTimer: any;

let uavMarker = new (window as any).GlobalAMap.Marker({
    // position: markerOption.clickLnglat,
    content: `<div>
    <img src="/uav-10.png" style="width: 48px; margin-bottom: 24px;">
    <img src="/shadow.png" style="width: 48px; margin-bottom: -12px;">
  </div>`, //将 html 传给 content
    anchor: "bottom-center"
});

onMounted(() => {
    (window as any).GlobalMap.on('click', onMapClick);
    polyline = new (window as any).GlobalAMap.Polyline({
        strokeWeight: 6, //线条宽度
        lineJoin: "round", //折线拐点连接处样式
        height: 500
    });
});

onUnmounted(() => {
    (window as any).GlobalMap.off('click', onMapClick);
});

const onMapClick = (ev: any) => {
    // markerOptionList.push({
    //     clickLnglat: lnglat,
    //     markerList: []
    // });

    // initMarkersAndLines();
};

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
    origin.value = selectOption.location;
}

const routeEndChange = (value: any) => {
    const selectOption = searchRouteEndOptions.value.find(option => option.value == value);
    destination.value = selectOption.location;
}

const routing = () => {
    return fetch(`https://restapi.amap.com/v3/direction/walking?key=${(window as any).webapiKey}&origin=${origin.value}&destination=${destination.value}&origin_id=${routeStart.value}&destination_id=${routeEnd.value}`);
}

const generatePath = () => {
    routing().then(result => {
        result.json().then((json) => {
            (window as any).GlobalMap.remove(polyline);
            polyline.setPath([]);
            locationList = [];
            console.log("generatePath", json);
            json.route.paths[0]?.steps.forEach((step: any) => {
                (step.polyline as string).split(';').forEach(position => {
                    const lnglat: string[] = position.split(',');
                    locationList.push(lnglat);
                });
            });

            polyline.setPath(locationList);
            (window as any).GlobalMap.add(polyline);
        });
    });
}

const simulatedFlight = () => {
    startAnimation();
}

const animateToNextPoint = () => {
    if (currentIndex >= locationList.length) {
        console.log("导航结束");
        return;
    }

    const targetLngLat = locationList[currentIndex];

    // 平滑移动
    (window as any).GlobalMap.setZoomAndCenter(16, targetLngLat, true, {
        duration: 2000,
        easing: 'ease-in-out'
    });

    // 显示当前点标记
    // const marker = new (window as any).GlobalAMap.Marker({
    //   position: targetLngLat,
    //   map: (window as any).GlobalMap,
    //   content: '<div style="background:red;border-radius:50%;width:20px;height:20px;"></div>'
    // });

    // 显示信息窗口
    // const infoWindow = new (window as any).GlobalAMap.InfoWindow({
    //   content: `<div>途经点 ${currentIndex + 1}/${markerOptionList.length}</div>`,
    //   offset: new (window as any).GlobalAMap.Pixel(0, -30)
    // });
    // infoWindow.open((window as any).GlobalMap, targetLngLat);

    (window as any).GlobalMap.remove(uavMarker);

    uavMarker = new (window as any).GlobalAMap.Marker({
        position: targetLngLat,
        content: `<div>
    <img src="/uav-10.png" style="width: 48px; margin-bottom: 24px;">
    <img src="/shadow.png" style="width: 48px; margin-bottom: -12px;">
  </div>`, //将 html 传给 content
        anchor: "bottom-center"
    });

    (window as any).GlobalMap.add(uavMarker);

    // 移动至下一个点
    animationTimer = setTimeout(() => {
        // marker.setMap(null);
        // infoWindow.close();
        currentIndex++;
        animateToNextPoint();
    }, 30);
}

const startAnimation = () => {
    if (currentIndex >= locationList.length) currentIndex = 0;
    animateToNextPoint();
}

const stopAnimation = () => {
    clearTimeout(animationTimer);
}

const saveRoute = () => {
    const routeMap = {
        routeName: routeName.value,
        routeHeight: routeHeight.value,
        routeStart: routeStart.value,
        routeEnd: routeEnd.value,
        locationList: locationList
    };

    const routeMapStringCache = localStorage.getItem('routeMapCache');
    const routeMapCache = routeMapStringCache ? JSON.parse(routeMapStringCache) : [];
    routeMapCache.push(routeMap);
    localStorage.setItem('routeMapCache', JSON.stringify(routeMapCache));
};

</script>
<style></style>