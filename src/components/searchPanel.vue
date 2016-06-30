<style scoped>
    .trending-search {
        text-align: center;
        padding-top: 10px;
    }

    .trending-search span {
        font-weight: bold;
    }

    .trending-search li {
        color: #673ab7;
        margin-top: 10px;
    }
</style>
<template>
    <section id="search-panel">
        <search-header></search-header>
        <div class="trending-search">
            <span>Trending Searchs</span>
            <ul>
                <li v-for="item in hotwords" v-touch:tap="tredingSearch(item)">
                    {{item}}
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    import SearchHeader from 'components/searchHeader';
    import Actions from 'actions';

    export default {
        vuex: {
            getters: {
                hotwords (state) {
                    return state.hotwords;
                }
            },
            actions: {
                setSearchTredingList: Actions.setSearchTredingList,
                setLoad: Actions.setLoad
            }
        },
        methods: {
            tredingSearch (keywords) {
                this.setLoad(true);
                this.setSearchTredingList((success) => {
                    this.setLoad(false);
                }, {
                    q: keywords,
                    page: 1,
                    'per_page': 25
                });
            }
        },
        components: {
            SearchHeader
        }
    };
</script>
