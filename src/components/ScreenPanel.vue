<template>
    <div class="boxall">
        <div class="alltitle">
            <slot name="title"></slot>
        </div>
        <slot></slot>
        <div class="boxfoot"></div>
    </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.boxall{
    border: 1px solid rgba(25,186,139,.17);
    padding:0 15px 15px 15px;
    background: rgba(55,55,55,.5) url(../images/line.png);
    background-size: 100% auto;
    position: relative;
    margin-bottom: 5px;
    z-index: 20;
}
.boxall:before,
.boxall:after{position:absolute;width: 5px;height: 5px;content: "";border-top: 2px solid #02a6b5;top: 0;}
.boxall:before,.boxfoot:before{border-left: 2px solid #02a6b5;left: 0;}
.boxall:after,.boxfoot:after{border-right: 2px solid #02a6b5; right: 0;}
.alltitle{ font-size:13px; color:#fff; text-align: center; line-height: 30px; border-bottom:1px solid rgba(255,255,255,.2)}
</style>
