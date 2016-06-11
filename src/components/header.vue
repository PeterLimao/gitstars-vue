<style scoped>
</style>
<template>
    <header>
        <tab>
            <tab-item :selected="true">Trending</tab-item>
            <tab-item :selected="false">Showcases</tab-item>
        </tab>
    </header>
</template>
<script>
    import Tab from 'vux-components/tab';
    import TabItem from 'vux-components/tab-item';

    export default {
        components: {
            Tab,
            TabItem
        }
    };
</script>
