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
        <div class="list-content" v-else>
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
        ready () {
            window.addEventListener('scroll', this.scrollHandler);
        },
        destroyed () {
            window.removeEventListener('scroll', this.scrollHandler);
        },
        methods: {
            tredingSearch (keywords) {
                this.setLoad(true);
                this.setSearchLoadmoreIndex(1);
                this.setSearchTredingList({
                    q: keywords,
                    page: 1,
                    'per_page': 25
                }).then((success) => {
                    if (success) {
                        this.setLoad(false);
                        this.setSearch(true);
                        this.setCacheKeywords(keywords);
                    }
                });
            },
            scrollHandler () {
                if (!this.isScroll || !this.isSearch) return;

                let winH = window.screen.availHeight;
                let top = document.documentElement.scrollTop || document.body.scrollTop;
                if ((winH + top) >= this.$el.offsetHeight - 500) {
                    this.isScroll = false;
                    this.$progress.start(3000);
                    let index = this.searchLoadmoreIndex + 1;
                    this.setSearchLoadmoreIndex(index);
                    this.setSearchTredingList({
                        q: this.cacheKeywords,
                        page: this.searchLoadmoreIndex,
                        'per_page': 25
                    }, false).then((success) => {
                        this.isScroll = true;
                        this.$progress.finish();
                    }).catch((error) => {
                        this.$progress.fail();
                    });
                }
            }
        },
        components: {
            SearchHeader,
            ListItems
        }
    };
</script>
