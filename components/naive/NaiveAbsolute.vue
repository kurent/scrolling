<template>
    <div style="position: relative;">
        <div v-for="(row, rowIndex) in reportData" :key="rowIndex" class="row" :style="{ transform: `translateY(${rowIndex * 30}px)` }">
            <div class="col">{{ rowIndex }}</div>
            <div v-for="(col, key, colIndex) in row" :key="colIndex + key" class="col" :style="{ transform: `translateX(${(colIndex + 1) * 250}px)` }">{{ col }}</div>
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
    }
}
</script>

<style scoped>
.row {
    position: absolute;
}

.col {
    position: absolute;
    min-width: 250px;
    display: inline-block;

    font-size: 12px;
    box-sizing: border-box;
    height: 30px;
    padding: 0 20px;
    line-height: 30px;

    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
</style>

