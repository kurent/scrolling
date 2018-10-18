<template>
    <div class="body">
        <vue-table></vue-table>
    </div>
</template>

<script>
import VueTable from './components/naive/NaiveSticky.vue'
export default {
    components: { VueTable }
}
</script>

<style lang="css" scoped>
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box; 
}

.body {
    display: flex;
}

.header {
    width: 100%;
    background: black;
}
</style>

