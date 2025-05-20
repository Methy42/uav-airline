<template>
    <div class="list-mini-card">
        <div class="list-mini-card-header">
            <slot name="header"></slot>
        </div>
        <div class="list-mini-card-content">
            <slot name="content"></slot>
        </div>
        <!-- <div class="list-mini-card-footer">
            <slot name="footer"></slot>
        </div> -->
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.list-mini-card {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    overflow: hidden;

    .list-mini-card-header {
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 13px;
        font-weight: bold;
    }

    .list-mini-card-content {
        color: #fff;
        font-size: 13px;
    }

    .list-mini-card-footer {
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 12px;
    }
}
</style>
