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

    export default {
        vuex: {
            getters: {
                hotwords: (state) => state.hotwords,
                searchTredingList: (state) => state.searchTrendingList,
                isSearch: (state) => state.isSearch
            },
            actions: {
                setSearchTredingList,
                setLoad,
                setSearch
            }
        },
        methods: {
            tredingSearch (keywords) {
                this.setLoad(true);
                this.setSearchTredingList({
                    q: keywords,
                    page: 1,
                    'per_page': 25
                }).then((success) => {
                    if (success) {
                        this.setLoad(false);
                        this.setSearch(true);
                    }
                });
            }
        },
        components: {
            SearchHeader,
            ListItems
        }
    };
</script>
