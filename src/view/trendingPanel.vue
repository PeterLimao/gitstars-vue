<style scoped>
    /*基本样式*/
    .list-content {
        padding: 50px 10px;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-overflow-scrolling: touch;
    }
</style>
<template>
    <section id="trending-panel">
        <v-nav></v-nav>
        <trending-header></trending-header>
        <div class="list-content" v-lazy>
            <list-items :list="trendingList"></list-items>
        </div>
    </section>
</template>
<script>
    import TrendingHeader from 'components/trendingHeader';
    import Nav from 'components/nav';
    import ListItems from 'components/listItems';
    import {setTrendingScrollPosition} from 'actions';

    export default {
        route: {
            activate () {
                this.$dispatch('footerChangeStateCtrl', '/trending');
            }
        },
        vuex: {
            getters: {
                trendingList: (state) => state.trendingList,
                trendingScrollPosition: (state) => state.trendingScrollPosition
            },
            actions: {
                setTrendingScrollPosition
            }
        },
        components: {
            TrendingHeader,
            ListItems,
            'v-nav': Nav
        },
        events: {
            setTrendingScrollPosition () {
                let position = this.$el.querySelector('.list-content').scrollTop;
                this.setTrendingScrollPosition(position);
            },
            setTrendingScrollTop () {
                this.$el.querySelector('.list-content').scrollTop = 0;
            }
        }
    };
</script>
