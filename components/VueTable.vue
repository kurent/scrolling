<template>
    <div style="position: relative;">

        <div class="table">

            <div class="fixed-columns">
                <div v-for="(row, rowIndex) in reportData" :key="rowIndex" class="row" :data-row-id="rowIndex">
                    <div class="col">{{ rowIndex }}</div>
                    <div v-for="(col, colIndex) in Object.entries(row).slice(0,2).map(entry => entry = entry[1])" :key="`fix-${rowIndex}-${colIndex}`" class="col" :data-col-id="colIndex">{{ col }}</div>
                </div>
            </div>

            <div class="dynamic-columns">
                <div v-for="(row, rowIndex) in reportData" :key="rowIndex" class="row" :data-row-id="rowIndex">
                    <div class="col">{{ rowIndex }}</div>
                    <div v-for="(col, colIndex, index) in row" :key="`dyn-${rowIndex}-${colIndex}`" class="col" :data-col-id="index">{{ col }}</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import reportData from '../data/report.json'
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
    left: 0;
    background: white;
    z-index: 20;
}

.dynamic-columns {
    /* position: absolute; */
    z-index: 10;
}

[data-row-id="0"] {
    position: sticky;
    top: 0;
    background: #eee;
    
}

</style>

