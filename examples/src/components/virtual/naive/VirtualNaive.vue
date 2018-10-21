<template>
    <div class="report-table-wrapper">
        <div id="templates">
            <div class="cell"></div>
        </div>

        <div id="report-table">
            <div id="headers-fixed"></div>
            <div id="headers-dynamic"></div>
            
            <div id="cells-fixed"></div>
            <div id="cells-dynamic__wrapper">
                <div id="cells-dynamic"></div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../../examples-config.js'
import { generateData } from '../../data/generate-data.js'
import Scroller from '../Scroller.js'

export default {
    data() {
        return {
            reportData: generateData(config.fixed, config.dynamic, config.rows),
            scroller: null,
        }
    },
    created() {
        
    },
    mounted() {
        this.scroller = new Scroller(this.reportData)
    }
}
</script>

<style scoped>
.report-table-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
}

#templates {
    position: absolute;
    visibility: hidden;
}

#report-table {
    position: absolute;
}

#headers-fixed {
    position: absolute;
    z-index: 1000;
}

#headers-dynamic {
    position: absolute;
    z-index: 500;
}

#cells-fixed {
    height: 100%;
    position: absolute;
    z-index: 700;
}

#cells-dynamic__wrapper {
    position: absolute;
}

#cells-dynamic {
    height: 100%;
    width: 100%;
    position: absolute;
}

.cell {
    position: absolute;
    width: 250px;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    font-size: 12px;
    font-weight: 500;
    user-select: none;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

</style>
