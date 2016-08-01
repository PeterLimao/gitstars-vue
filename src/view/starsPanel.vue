<style scoped>
    /*基本样式*/
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
    <div id="stars-panel">
        <login v-if="shouldLogin"></login>
        <div class="star-panel" v-else>
            <search-header></search-header>
            <div class="list-content" @scroll="scrollHandler" v-else>
                <list-items :list="starsList"></list-items>
            </div>
        </div>
    </div>
</template>
<script>
    import Login from 'components/login';
    import SearchHeader from 'components/searchHeader';
    import ListItems from 'components/listItems';
    import {setStarsList} from 'actions';
    import {setLoad} from 'actions';
    import {setStarsCacheKeywords} from 'actions';
    import {setStarsLoadmoreIndex} from 'actions';

    export default {
        data () {
            return {
                shouldLogin: false,
                isScroll: true
            }
        },
        vuex: {
            getters: {
                starsList: (state) => state.starsList,
                starsLoadmoreIndex: (state) => state.starsLoadmoreIndex
            },
            actions: {
                setStarsList,
                setLoad,
                setStarsCacheKeywords,
                setStarsLoadmoreIndex
            }
        },
        ready () {
            this.shouldLogin = false;
            if (this.starsList.length === 0) {
                this.getStarsList();
            }
        },
        methods: {
            getStarsList () {
                this.setLoad(true);
                this.setStarsList({}).then(() => {
                    this.setLoad(false);
                    this.setStarsCacheKeywords('');
                }).catch((err) => {
                    this.setLoad(false);
                    this.shouldLogin = true;
                });
            },
            scrollHandler () {
                if (!this.isScroll || this.shouldLogin) return;

                let winH = window.screen.availHeight;
                let top = this.$el.querySelector('.list-content').scrollTop;
                let height = this.$el.querySelector('#list-items').offsetHeight;

                if ((winH + top) >= height - 500) {
                    this.isScroll = false;
                    this.$progress.start(3000);
                    let index = this.starsLoadmoreIndex + 1;
                    this.setStarsLoadmoreIndex(index);
                    this.setStarsList({
                        q: this.cacheKeywords,
                        page: this.starsLoadmoreIndex,
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
                this.setLoad(true);
                this.setStarsList({
                    q: msg,
                    page: 1,
                    'per_page': 25
                }).then(() => {
                    this.$el.querySelector('.list-content').scrollTop = 0;
                    this.shouldLogin = false;
                    this.setLoad(false);
                    this.setStarsLoadmoreIndex(1);
                    this.setStarsCacheKeywords(msg);
                });
            }
        },
        components: {
            Login,
            SearchHeader,
            ListItems
        }
    };
</script>
