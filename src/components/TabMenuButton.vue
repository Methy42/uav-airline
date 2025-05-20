<template>
    <div class="tab-menu-button-container" :class="{ active: props.active }" @click="$emit('click')">
        <div class="button-icon">
            <slot name="icon"></slot>
        </div>
        <div class="button-label">
            <slot name="label"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);
</script>
<style scoped lang="scss">
.tab-menu-button-container {
    width: 72px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        opacity: 0.8;
    }

    .button-icon {
        width: 48px;
        height: 48px;
        background: var(--color-primary);
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        /* 图标默认样式 */
        :slotted(img) {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }

        /* 如果使用字体图标 */
        :slotted(i) {
            font-size: 24px;
            color: white;
        }
    }

    .button-label {
        font-size: 12px;
        color: var(--text-color-primary);
        text-align: center;
        line-height: 1.4;
        max-width: 72px;
        word-break: break-word;
    }

    // 带有 active 类时的样式，让按钮放大一些
    &.active {
        transform: scale(1.2);
    }
}
</style>