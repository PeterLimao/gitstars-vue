<style lang="less" scoped>
    @import '~assets/style/common';

    /*基本样式*/
    .trending-search {
        text-align: center;
        padding-top: 30px;
        span {
            font-weight: bold;
        }
        li {
            color: @base-puple;
            margin-top: 10px;
        }
    }

    .list-content {
        .position(absolute);
        padding: 20px 10px;
        padding-bottom: 50px;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
    }
</style>
<template>
    <div id="search-panel">
        <search-header></search-header>
        <div class="trending-search" v-if="!isSearch">
            <span>{{ $t('words.trendingSearch') }}</span>
            <ul>
                <li v-for="item in hotwords" v-touch:tap="tredingSearch(item)">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="search-content" v-else>
            <div class="list-content" @scroll="scrollHandler" v-lazy>
                <list-items :list="searchTrendingList" v-show="searchTrendingList.length !== 0"></list-items>
            </div>
            <not-found type="noResult" v-show="searchTrendingList.length === 0"></not-found>
        </div>
    </div>
</template>
<script>
    import SearchHeader from 'components/searchHeader';
    import ListItems from 'components/listItems';
    import NotFound from 'components/notFound';

    export default {
        data () {
            return {
                isScroll: true
            };
        },
        route: {
            data ({ from }) {
                this.$dispatch('footerChangeStateCtrl', '/search');
                if (/(detail)/g.test(from.path)) this.initScrollPosition();
            }
        },
        computed: {
            hotwords () {
                return this.$store.getters.getHotwords;
            },
            searchTrendingList () {
                return this.$store.getters.getSearchTrendingList;
            },
            isSearch () {
                return this.$store.getters.getSearch;
            },
            searchLoadmoreIndex () {
                return this.$store.getters.getSearchLoadmoreIndex;
            },
            cacheKeywords () {
                return this.$store.getters.getCacheKeywords;
            },
            searchScrollPosition () {
                return this.$store.getters.getSearchScrollPosition;
            }
        },
        methods: {
            setSearchTrendingList (params, isFirst) {
                return this.$store.dispatch('setSearchTrendingList', {
                    params,
                    isFirst
                });
            },
            setLoad (isLoad) {
                this.$store.dispatch('setLoad', {
                    isLoad
                });
            },
            setSearch (isSearch) {
                this.$store.dispatch('setSearch', {
                    isSearch
                });
            },
            setSearchLoadmoreIndex (index) {
                this.$store.dispatch('setSearchLoadmoreIndex', {
                    index
                });
            },
            setCacheKeywords (keywords) {
                this.$store.dispatch('setCacheKeywords', {
                    keywords
                });
            },
            setSearchScrollPosition (position) {
                this.$store.dispatch('setSearchScrollPosition', {
                    position
                });
            },
            initScrollPosition () {
                const dom = this.$el.querySelector('.list-content');
                if (!dom) return;

                const timeout = setTimeout(() => {
                    dom.scrollTop = this.searchScrollPosition;
                    clearTimeout(timeout);
                }, 100);
            },
            tredingSearch (keywords) {
                this.setLoad(true);
                this.setSearchLoadmoreIndex(1);
                this.setSearchTrendingList({
                    q: keywords,
                    page: 1,
                    'per_page': 25
                }).then(() => {
                    this.setLoad(false);
                    this.setSearch(true);
                    this.setCacheKeywords(keywords);
                });
            },
            scrollHandler () {
                if (!this.isScroll || !this.isSearch || this.searchTrendingList.length === 0) return;

                const winH = window.screen.availHeight;
                const top = this.$el.querySelector('.list-content').scrollTop;
                const height = this.$el.querySelector('#list-items').offsetHeight;

                if ((winH + top) >= height - 500) {
                    this.isScroll = false;
                    this.$progress.start(3000);
                    const index = this.searchLoadmoreIndex + 1;
                    this.setSearchLoadmoreIndex(index);
                    this.setSearchTrendingList({
                        q: this.cacheKeywords,
                        page: this.searchLoadmoreIndex,
                        'per_page': 25
                    }, false).then(() => {
                        this.isScroll = true;
                        this.$progress.finish();
                    }).catch(() => {
                        this.$progress.fail();
                    });
                }
            }
        },
        events: {
            searchResult (msg) {
                if (!msg) return;

                this.setLoad(true);
                this.setSearchTrendingList({
                    q: msg,
                    page: 1,
                    'per_page': 25
                }).then(() => {
                    if (this.$el.querySelector('.list-content')) this.$el.querySelector('.list-content').scrollTop = 0;
                    this.setLoad(false);
                    this.setSearch(true);
                    this.setCacheKeywords(msg);
                    this.setSearchLoadmoreIndex(1);
                });
            },
            setSearchScrollPosition () {
                const position = this.$el.querySelector('.list-content').scrollTop;
                this.setSearchScrollPosition(position);
            }
        },
        components: {
            SearchHeader,
            ListItems,
            NotFound
        }
    };
</script>
