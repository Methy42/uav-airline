<template>
    <div class="count-card-container">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="count" :style="{ color: props.color || '#00b3ff' }">
            <slot name="count"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    color: {
        type: String,
        default: ''
    }
});
</script>
<style lang="scss" scoped>
.count-card-container {
    width: 80px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    overflow: hidden;

    .title {
        font-size: 12px;
        color: #fff;
        padding: 5px 0;
        text-align: center;
        background-color: rgba(0,0,0,0.7);
    }

    .count {
        font-size: 20px;
        font-style: italic;
        font-weight: bolder;
        color: #00b3ff;
        padding: 5px 0;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
    }
}
</style>
