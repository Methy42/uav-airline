<template>
  <div class="container" :style="{ height: `${screenHeight}px`, backgroundColor: '#000' }">
    <div id="map-container"></div>
    <!-- <ThreeDemo class="three-demo" /> -->
    <Overview v-if="menuActiveIndex === 0" />
    <RouteManager v-if="menuActiveIndex === 1" />
    <UAVManager v-if="menuActiveIndex === 2" />
    <GroundFacilityManager v-if="menuActiveIndex === 3" />
    <FlightMissionManager v-if="menuActiveIndex === 4" />
    <EventManager v-if="menuActiveIndex === 5" />
    <ScreenHeader class="screen-header" />
    <TabMenu class="tab-menu" :isCollapse="isCollapse" :activeIndex="menuActiveIndex" @changeTab="(index) => menuActiveIndex = index" />
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { CirclePlus, List, Operation, Fold, Expand } from '@element-plus/icons-vue';
import { onMounted, onUnmounted, ref } from 'vue';
// import PlotsDivide from './components/PlotsDivide.vue';
import ScreenHeader from './components/ScreenHeader.vue';
import TabMenu from './components/TabMenu.vue';
import Overview from './components/Overview.vue';
import RouteManager from './components/RouteManager.vue';
import UAVManager from './components/UAVManager.vue';
import GroundFacilityManager from './components/GroundFacilityManager.vue';
import FlightMissionManager from './components/FlightMissionManager.vue';
import EventManager from './components/EventManager.vue';

const isCollapse = ref<boolean>(false);
const menuActiveIndex = ref<number>(0);
const screenHeight = ref<number>(window.innerWidth * 1080 / 1920);

(window as any).webapiKey = 'e2a7272563257d048ecf3015b942ad71';

onMounted(() => {
  initMap();

  window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
});

const onWindowResize = () => {
  screenHeight.value = window.innerWidth * 1080 / 1920;
}

const initMap = () => {
  (window as any).GlobalAMap = (window as any).AMap;

  // 初始化地图121.47, 31.23121.47, 31.23
  (window as any).GlobalMap = new (window as any).GlobalAMap.Map("map-container", {
    pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
    viewMode: '3D', //地图模式
    // layers: [new AMap.Buildings()],
    rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
    pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
    zoom: 17, //初始化地图层级
    rotation: -15, //初始地图顺时针旋转的角度
    zooms: [2, 20], //地图显示的缩放级别范围
    center: [87.606764, 43.821468], //初始地图中心经纬度
    mapStyle: 'amap://styles/dark',
  });

  // setTimeout(() => {
  //   initMarkersAndLines();
  // }, 1000);

  (window as any).GlobalMap.on('click', function (ev: any) {
    console.log(ev.lnglat);

    if (menuActiveIndex.value != 2) return;
    //触发事件的地理坐标，AMap.LngLat 类型
    var lnglat: any[] = ev.lnglat;

    // checkIfOnRoad(lnglat).then(() => {
    console.log('点击位置在道路上');
    // markerOptionList.push({
    //   clickLnglat: lnglat,
    //   markerList: []
    // });


    // initMarkersAndLines();
    // }).catch(() => {
    //   ElMessage.error('点击位置不在道路上');
    //   return;
    // });
  });

  // (window as any).GlobalMap.on('complete', () => {
  //   drawCircles(schoolList);
  // });

  getLocation().then((coords: any) => {
    console.log('coords', coords);

    // map.setCenter([ coords.longitude, coords.latitude ]);
  });
}

const getLocation = () => new Promise<GeolocationCoordinates>((resolve, reject) => {
  if (!navigator.geolocation) {
    ElMessage.error("浏览器不支持地理位置功能");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const coords = position.coords;
      resolve(coords);
    },
    error => {
      let errorMsg;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = "用户拒绝提供位置权限";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "无法获取位置信息";
          break;
        case error.TIMEOUT:
          errorMsg = "定位超时";
          break;
        default:
          errorMsg = "未知错误";
      }
      ElMessage.error(errorMsg);
      reject(errorMsg);
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    }
  );
})
</script>
<style scoped>
::v-deep.el-container {
  height: 100%;
  position: relative;
}

#map-container {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.el-menu {
  height: 100%;
}

::v-deep.el-menu-item.fold-and-expand {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.route-create-container,
.route-list-container {
  position: absolute;
  top: 15px;
  left: 15px;
}

.container {
  width: 100vw;
  height: 100vh;

  position: relative;

  background-size: cover;
}

.screen-header {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.tab-menu {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
