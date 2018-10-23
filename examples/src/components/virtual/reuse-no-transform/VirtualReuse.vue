<template>
    <div class="report-table-wrapper">
        <div id="templates">
            <div class="cell"></div>
        </div>

        <div id="report-table">
            <div id="cells-fixed">
                
            </div>
            <div id="cells-dynamic__wrapper">
                <div id="cells-dynamic">
                    <div id="headers-dynamic"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../../examples-config.js'
import { generateData } from '../../../data/generate-data.js'
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
        this.scroller = new Scroller(this.reportData, { useTransform: false })
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
}

#cells-fixed {
    position: absolute;
    z-index: 700;
}

#cells-dynamic {
    width: 100%;
    position: absolute;
}

#cells-dynamic__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    /* overflow-x: scroll; */
}

#headers-fixed {
    position: absolute;
    z-index: 1000;
}

#headers-dynamic {
    position: absolute;
    z-index: 500;
}
</style>
