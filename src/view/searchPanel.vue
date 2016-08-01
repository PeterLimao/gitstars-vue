<style scoped>
    /*基本样式*/
    .trending-search {
        text-align: center;
        padding-top: 30px;
    }

    .trending-search span {
        font-weight: bold;
    }

    .trending-search li {
        color: #673ab7;
        margin-top: 10px;
    }

    .list-content {
        padding: 20px 10px;
        padding-bottom: 50px;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-overflow-scrolling: touch;
    }
</style>
<template>
    <div id="search-panel">
        <search-header></search-header>
        <div class="trending-search" v-if="!isSearch">
            <span>Trending Searchs</span>
            <ul>
                <li v-for="item in hotwords" v-touch:tap="tredingSearch(item)">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-content" @scroll="scrollHandler" v-else v-lazy>
            <list-items :list="searchTredingList"></list-items>
        </div>
    </div>
</template>
<script>
    import SearchHeader from 'components/searchHeader';
    import ListItems from 'components/listItems';
    import {setSearchTredingList} from 'actions';
    import {setLoad} from 'actions';
    import {setSearch} from 'actions';
    import {setSearchLoadmoreIndex} from 'actions';
    import {setCacheKeywords} from 'actions';

    export default {
        data () {
            return {
                isScroll: true
            }
        },
        vuex: {
            getters: {
                hotwords: (state) => state.hotwords,
                searchTredingList: (state) => state.searchTrendingList,
                isSearch: (state) => state.isSearch,
                searchLoadmoreIndex: (state) => state.searchLoadmoreIndex,
                cacheKeywords: (state) => state.cacheKeywords
            },
            actions: {
                setSearchTredingList,
                setLoad,
                setSearch,
                setSearchLoadmoreIndex,
                setCacheKeywords
            }
        },
        methods: {
            tredingSearch (keywords) {
                this.setLoad(true);
                this.setSearchLoadmoreIndex(1);
                this.setSearchTredingList({
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
                if (!this.isScroll || !this.isSearch) return;

                let winH = window.screen.availHeight;
                let top = this.$el.querySelector('.list-content').scrollTop;
                let height = this.$el.querySelector('#list-items').offsetHeight;

                if ((winH + top) >= height - 500) {
                    this.isScroll = false;
                    this.$progress.start(3000);
                    let index = this.searchLoadmoreIndex + 1;
                    this.setSearchLoadmoreIndex(index);
                    this.setSearchTredingList({
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
                this.setSearchTredingList({
                    q: msg,
                    page: 1,
                    'per_page': 25
                }).then(() => {
                    this.$el.querySelector('.list-content').scrollTop = 0;
                    this.setLoad(false);
                    this.setSearch(true);
                    this.setCacheKeywords(msg);
                    this.setSearchLoadmoreIndex(1);
                });
            }
        },
        components: {
            SearchHeader,
            ListItems
        }
    };
</script>
