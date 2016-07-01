<style scoped>
    .list-content {
        padding: 50px 10px;
    }
</style>
<template>
    <section id="home-panel">
        <v-nav></v-nav>
        <home-header></home-header>
        <div class="list-content">
            <list-items :list="trendingList"></list-items>
        </div>
    </section>
</template>
<script>
    import HomeHeader from 'components/homeHeader';
    import Nav from 'components/nav';
    import ListItems from 'components/listItems';

    export default {
        vuex: {
            getters: {
                trendingList (state) {
                    return state.trendingList;
                }
            }
        },
        components: {
            HomeHeader,
            ListItems,
            'v-nav': Nav
        }
    };
</script>
