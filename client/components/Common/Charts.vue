<template>
    <div>
        <apexchart :height="height" :options="record.options" :series="record.series" v-if="!loading" />
    </div>
</template>
<script>
export default {
    props: ['height', 'record', 'loading']
}
</script>
<style>
</style>
