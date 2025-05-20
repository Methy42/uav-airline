<template>
    <div class="ground-facilities-chart-container">
        <div class="label-row">
            <div>故障</div>
            <div>异常</div>
        </div>
        <div class="row">
            <div class="left-process">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="20" status="exception">
                    <span>20</span>
                </el-progress>
            </div>
            <div class="label">机场</div>
            <div class="right-process">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="80" status="success">
                    <span>80</span>
                </el-progress>
            </div>
        </div>
        <div class="row">
            <div class="left-process">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="30" status="exception">
                    <span>30</span>
                </el-progress>
            </div>
            <div class="label">气象站</div>
            <div class="right-process">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="70" status="success">
                    <span>70</span>
                </el-progress>
            </div>
        </div>
        <div class="row">
            <div class="left-process">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="40" status="exception">
                    <span>40</span>
                </el-progress>
            </div>
            <div class="label">信号站</div>
            <div class="right-process">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="60" status="success">
                    <span>60</span>
                </el-progress>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.ground-facilities-chart-container {
    width: 100%;
    height: 100%;

    .row {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;

        .left-process, .right-process {
            flex-grow: 1;
            ::v-deep .el-progress-bar__inner {
                line-height: 15px;
            }
        }

        .left-process {
            ::v-deep .el-progress-bar__inner {
                left: unset;
                right: 0;
            }
        }

        .right-process {
            ::v-deep .el-progress-bar__inner {
                text-align: left;
            }
        }

        .label {
            width: 80px;
            text-align: center;
            font-size: 13px;
        }
    }
    
    .label-row {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
}
</style>