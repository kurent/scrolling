<template>
    <div>
        <div v-for="(row, rowIndex) in reportData" :key="rowIndex" class="row">
            <div class="col">{{ rowIndex }}</div>
            <div v-for="(col, key, colIndex) in row" :key="colIndex + key" class="col">{{ col }}</div>
        </div>
    </div>
</template>

<script>
import reportData from '../data/report-big.json'
export default {
    data() {
        return {
            reportData
        }
    },
    /* eslint-disable */
    created () {
        console.log('created')
        performance.measure
    },
    mounted () {
        console.log('mounted')
        console.log(performance.now())
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
    

    font-size: 12px;
    box-sizing: border-box;
    padding: 0 20px;

    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
</style>

