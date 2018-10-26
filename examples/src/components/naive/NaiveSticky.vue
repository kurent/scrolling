<template>
    <div>
        <div class="table" :style="{ width: tableWidth, height: tableHeight }">

            <div class="fixed-columns">
                <div class="fixed-headers">
                    <div v-for="(col, colIndex) in reportData.headers.fixed" :key="colIndex" class="row row__header row__header--fixed">
                        <div class="col col--fixed" :data-row-id="1" :data-col-id="colIndex">{{ col }}</div>
                    </div>
                </div>

                <div v-for="(row, rowIndex) in reportData.data" :key="rowIndex" class="row">
                    <div v-for="(colIndex) in fixedCols + 1" :key="`${rowIndex}-${colIndex - 1}`" class="col col--fixed" :data-row-id="rowIndex" :data-col-id="colIndex - 1">{{ row[colIndex - 1] }}</div>
                </div>
            </div>

            <div class="dynamic-columns">
                <div class="dynamic-headers">
                    <div v-for="(col, colIndex) in reportData.headers.dynamic" :key="colIndex" class="row row__header row__header--dynamic">
                        <div class="col col--fixed" :data-row-id="1" :data-col-id="colIndex">{{ col }}</div>
                    </div>
                </div>

                <div v-for="(row, rowIndex) in reportData.data" :key="rowIndex" class="row">
                    <div v-for="(colIndex) in dynamicCols" :key="`${rowIndex}-${colIndex - 1}`" class="col col--dynamic" :data-row-id="rowIndex" :data-col-id="colIndex - 1">{{ row[colIndex - 1] }}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
import config from '../examples-config.js'
import { generateData } from '../../data/generate-data.js'
export default {
    data() {
        return {
            fixedCols: config.fixed,
            dynamicCols: config.dynamic,
            reportData: null,
        }
    },
    computed: {
        tableWidth () {
            return `${(this.fixedCols + this.dynamicCols) * config.cellWidth}px`
        },
        tableHeight () {
            return `${(this.reportData.data) * config.cellHeight}px`
        }
    },
    created() {
        this.reportData = generateData(this.fixedCols, this.dynamicCols, 1000)
        this.t1 = performance.now()
    },
    mounted() {
        this.t2 = performance.now()
        console.log('mounted:', this.t2)
        console.log('diff', this.t2 - this.t1)
    }
}
</script>

<style scoped>
.row {
    display: flex;
}

.col {
    width: 250px;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 12px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.table {
    /* top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    display: flex;
}


.fixed-headers,
.dynamic-headers {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    display: flex;
    z-index: 100;
}

.fixed-columns {
    position: sticky;
    position: -webkit-sticky;
    left: 0;
    background: #eee;
    z-index: 20;
}

.dynamic-columns {
    z-index: 10;
}


.row__header {
    background: #eee;
}

</style>

