<style scoped>
    /*基本样式*/
    .list-content {
        padding: 50px 10px;
    }
</style>
<template>
    <section id="trending-panel">
        <v-nav></v-nav>
        <trending-header></trending-header>
        <div class="list-content">
            <list-items :list="trendingList"></list-items>
        </div>
    </section>
</template>
<script>
    import TrendingHeader from 'components/trendingHeader';
    import Nav from 'components/nav';
    import ListItems from 'components/listItems';

    export default {
        vuex: {
            getters: {
                trendingList: (state) => state.trendingList
            }
        },
        components: {
            TrendingHeader,
            ListItems,
            'v-nav': Nav
        }
    };
</script>
