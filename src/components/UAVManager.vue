<template>
    <div class="route-manager-container">
        <ScreenPanel v-if="pageState === 'list'" class="route-table-panel">
            <template #title>无人机列表</template>
            <div class="route-table-option">
                <el-button type="primary" :size="'small'" @click="pageState = 'create'">添加无人机</el-button>
            </div>
            <el-table :data="tableData" :size="'small'" border style="width: 100%;">
                <el-table-column prop="model" label="型号" />
                <el-table-column prop="identifier" label="编号" />
                <el-table-column label="操作" width="110">
                    <template #default="scope">
                        <el-button type="text" size="small"
                            @click="() => { viewUav(scope.$index) }">详情</el-button>
                        <el-button type="text" size="small"
                            @click="() => { console.log('删除', scope.row); }">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </ScreenPanel>
        <ScreenPanel v-if="pageState === 'create' || pageState === 'view' || pageState === 'edit'" class="route-table-panel">
            <template #title>
                <span v-if="pageState === 'create'">添加无人机</span>
                <span v-else-if="pageState === 'view'">无人机详情</span>
                <span v-else-if="pageState === 'edit'">编辑无人机</span>
            </template>
            <el-form :model="formModel" label-width="auto" style="margin-top: 10px;">
                <el-form-item label="型号" prop="model">
                    <el-input v-if="pageState === 'create' || pageState === 'edit'" v-model="formModel.model" />
                    <el-text v-else-if="pageState === 'view'">{{ formModel.model }}</el-text>
                </el-form-item>
                <el-form-item label="编号" prop="identifier">
                    <el-input v-if="pageState === 'create' || pageState === 'edit'" v-model="formModel.identifier" />
                    <el-text v-else-if="pageState === 'view'">{{ formModel.identifier }}</el-text>
                </el-form-item>
                <el-form-item label="预览">
                    <canvas ref="OverviewCanvas" class="overview-canvas"></canvas>
                </el-form-item>
                <el-form-item v-if="pageState === 'create'">
                    <el-button type="primary" @click="saveUav">保存</el-button>
                    <el-button @click="pageState = 'list'">取消</el-button>
                </el-form-item>
                <el-form-item v-if="pageState === 'view'">
                    <el-button type="primary" @click="saveUav">编辑</el-button>
                    <el-button @click="pageState = 'list'">返回</el-button>
                </el-form-item>
            </el-form>
        </ScreenPanel>
    </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import ScreenPanel from './ScreenPanel.vue';

const pageState = ref<'list' | 'create' | 'view' | 'edit'>('list');

const tableData = ref<any[]>([]);

const formModel = ref({
    model: '',
    identifier: '',
});

const currentUavIndex = ref<number | null>(null);

const OverviewCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    loadUavList();
});

const saveUav = () => {
    const uavList = JSON.parse(localStorage.getItem('uavList') || '[]');
    uavList.push(formModel.value);
    localStorage.setItem('uavList', JSON.stringify(uavList));
    pageState.value = 'list';
    loadUavList();
};

const loadUavList = () => {
    const uavList = JSON.parse(localStorage.getItem('uavList') || '[]');
    tableData.value = uavList;
};

const viewUav = (index: any) => {
    currentUavIndex.value = index;
    formModel.value = tableData.value[index];
    pageState.value = 'view';

    nextTick(() => {
        loadOverviewModel();
    });
};

const loadOverviewModel = () => {
    if (OverviewCanvas.value) {
        const canvas = OverviewCanvas.value;

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(devicePixelRatio);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.position.z = 80;
        camera.position.y = 80;
        camera.position.x = 80;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const roomEnvironment = new RoomEnvironment();
        scene.background = new THREE.Color(0x00000000);;
        scene.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
        scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        
        gltfLoader.load('/uav.glb', (gltf) => {
            scene.add(gltf.scene);
            animate();
        });

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
    }
};
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

.overview-canvas {
    width: 400px;
    height: 300px;
}
</style>