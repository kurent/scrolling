<template>
    <div style="position: relative;">

        <div class="table">

            <div class="fixed-columns">
                <div class="fixed-headers">
                    <div v-for="(col, colIndex) in reportData.headers.fixed" :key="colIndex" class="row row__header row__header--fixed">
                        <div class="col col--fixed" :data-row-id="1" :data-col-id="colIndex">{{ col }}</div>
                    </div>
                </div>

                <div v-for="(row, rowIndex) in reportData.data.fixed" :key="rowIndex" class="row">
                    <div v-for="(col, colIndex) in row" :key="`${rowIndex}-${colIndex}`" class="col col--fixed" :data-row-id="rowIndex" :data-col-id="colIndex">{{ col }}</div>
                </div>
            </div>

            <div class="dynamic-columns">
                <div class="dynamic-headers">
                    <div v-for="(col, colIndex) in reportData.headers.dynamic" :key="colIndex" class="row row__header row__header--dynamic">
                        <div class="col col--fixed" :data-row-id="1" :data-col-id="colIndex">{{ col }}</div>
                    </div>
                </div>

                <div v-for="(row, rowIndex) in reportData.data.dynamic" :key="rowIndex" class="row">
                    <div v-for="(col, colIndex) in row" :key="`${rowIndex}-${colIndex}`" class="col col--dynamic" :data-row-id="rowIndex" :data-col-id="colIndex">{{ col }}</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
/* eslint-disable */
import { generateData } from '../../data/generate-data.js'
export default {
    data() {
        return {
            reportData: generateData(3, 17, 100)
        }
    },
    created() {
        this.t1 = performance.now()
        console.log('created:', this.t1)
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
    position: relative;
    display: flex;
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

.fixed-headers,
.dynamic-headers {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    display: flex;
}

.row__header {
    background: #eee;
}

</style>

