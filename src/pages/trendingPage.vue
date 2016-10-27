<style lang="less" scoped>
    @import '~assets/style/common';

    .list-content {
        .list-content-style(0);
        padding: 50px 10px;
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
    import 'libs/material-refresh/material-refresh';
    import TrendingHeader from 'components/trendingHeader';
    import Nav from 'components/nav';
    import ListItems from 'components/listItems';

    export default {
        route: {
            data ({ from }) {
                this.$dispatch('footerChangeStateCtrl', '/trending');
                if (/(detail)/g.test(from.path)) this.initScrollPosition();
            }
        },
        ready () {
            window.mRefresh({
                scrollEl: '.list-content',
                onBegin: this.onBegin,
                top: '0px',
                theme: 'mui-blue-theme',
                index: 9999,
                maxTime: 3000,
                freeze: false
            });
            this.setTrendingList();
        },
        computed: {
            trendingList () {
                return this.$store.getters.getTrendingList;
            },
            trendingScrollPosition () {
                return this.$store.getters.getTrendingScrollPosition;
            }
        },
        methods: {
            initScrollPosition () {
                const dom = this.$el.querySelector('.list-content');
                const timeout = setTimeout(() => {
                    dom.scrollTop = this.trendingScrollPosition;
                    clearTimeout(timeout);
                }, 100);
            },
            onBegin () {
                this.setTrendingList().then(() => {
                    window.mRefresh.resolve();
                });
            },
            setTrendingList (type) {
                return this.$store.dispatch('setTrendingList', {
                    type
                });
            },
            setShowNav (isShow) {
                this.$store.dispatch('isShow', {
                    isShow
                });
            },
            setTrendingScrollPosition (position) {
                this.$store.dispatch('setTrendingScrollPosition', {
                    position
                });
            }
        },
        components: {
            'v-nav': Nav,
            TrendingHeader,
            ListItems
        },
        events: {
            setTrendingScrollPosition () {
                const position = this.$el.querySelector('.list-content').scrollTop;
                this.setTrendingScrollPosition(position);
            },
            setTrendingScrollTop () {
                this.$el.querySelector('.list-content').scrollTop = 0;
            }
        }
    };
</script>
