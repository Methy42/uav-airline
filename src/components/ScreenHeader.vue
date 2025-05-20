<template>
    <div class="header-container">
        <div class="bg-1">
            <img class="bg-img" src="../assets/header/u14.svg" alt="">
        </div>
        <div class="bg-2">
            <img class="bg-img" src="../assets/header/u13.svg" alt="">
        </div>
        <div class="bg-3">
            <img class="bg-img" src="../assets/header/u21.svg" alt="">
        </div>
        <div class="bg-4">
            <img class="bg-img" src="../assets/header/u17.svg" alt="">
        </div>
        <div class="bg-5">
            <img class="bg-img" src="../assets/header/u20.svg" alt="">
        </div>
        <div class="bg-6">
            <img class="bg-img" src="../assets/header/u11.svg" alt="">
        </div>
        <div class="bg-7">
            <img class="bg-img" src="../assets/header/u12.svg" alt="">
        </div>
        <div class="bg-8">
            <img class="bg-img" src="../assets/header/u21.svg" alt="">
        </div>
        <div class="bg-9">
            <img class="bg-img" src="../assets/header/u23.svg" alt="">
        </div>
        <div class="bg-10">
            <img class="bg-img" src="../assets/header/u26.svg" alt="">
        </div>
        <div class="bg-11">
            <img class="bg-img" src="../assets/header/u24.svg" alt="">
        </div>
        <div class="bg-12">
            <img class="bg-img" src="../assets/header/u25.svg" alt="">
        </div>
        <div class="bg-13">
            <img class="bg-img" src="../assets/header/u28.svg" alt="">
        </div>
        <div class="bg-14">
            <img class="bg-img" src="../assets/header/u28.svg" alt="">
        </div>
        <div class="bg-15">
            <img class="bg-img" src="../assets/header/u15.svg" alt="">
        </div>
        <div class="bg-16">
            <img class="bg-img" src="../assets/header/u16.svg" alt="">
        </div>
        <div class="title">低空经济规划系统</div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.header-container {
    width: 1920px;
    height: 180px;

    position: relative;

    background-size: cover;

    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0) 100%
        );
}

.bg-1 {
    position: absolute;
    top: 0;
    left: 4px;
    width: 1912px;
    height: 39px;
}

.bg-2 {
    position: absolute;
    top: 7px;
    left: 4px;
    width: 1902px;
    height: 37px;
}

.bg-3 {
    position: absolute;
    top: 12px;
    left: 725.5px;
    width: 469px;
    height: 5px;
}

.bg-4 {
    position: absolute;
    top: 49px;
    left: 0px;
    width: 853px;
    height: 7px;
}

.bg-5 {
    position: absolute;
    top: 49px;
    right: 0px;
    width: 853px;
    height: 7px;

    .bg-img {
        transform: rotate(180deg);
    }
}

.bg-6 {
    position: absolute;
    top: 62px;
    left: 4px;
    width: 1902px;
    height: 37px;
}

.bg-7 {
    position: absolute;
    top: 67px;
    left: 4px;
    width: 1912px;
    height: 39px;
}

.bg-8 {
    position: absolute;
    top: 87px;
    left: 725.5px;
    width: 469px;
    height: 5px;
}

.bg-9 {
    position: absolute;
    top: 87px;
    left: 935px;
    width: 50px;
    height: 35px;
}

.bg-10 {
    position: absolute;
    top: 87px;
    left: 947px;
    width: 26px;
    height: 22px;
}

.bg-11 {
    position: absolute;
    top: 85px;
    left: 940px;
    width: 14px;
    height: 23px;
}

.bg-12 {
    position: absolute;
    top: 85px;
    left: 967px;
    width: 14px;
    height: 23px;
}

.bg-13 {
    position: absolute;
    top: 45px;
    left: 760px;
    width: 15px;
    height: 15px;
}

.bg-14 {
    position: absolute;
    top: 45px;
    right: 760px;
    width: 15px;
    height: 15px;
}

.bg-15 {
    position: absolute;
    top: 80px;
    left: 0px;
    width: 757px;
    height: 15px;
}

.bg-16 {
    position: absolute;
    top: 80px;
    right: 0px;
    width: 757px;
    height: 15px;
}

.bg-img {
    width: 100%;
    height: 100%;

    display: block;
}

.title {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);

    font-size: 32px;
    font-weight: 700;
    color: #fff;
}
</style>
