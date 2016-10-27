<style lang="less" scoped>
    @import '~assets/style/common';

    /*基本样式*/
    .list-content {
        .list-content-style(20px);
    }
</style>
<template>
    <div id="stars-panel">
        <login v-if="shouldLogin"></login>
        <div class="star-panel" v-else>
            <search-header></search-header>
            <div class="list-content" @scroll="scrollHandler" v-lazy>
                <list-items :list="starsList" v-show="starsList.length !== 0"></list-items>
            </div>
            <not-found type="noResult" v-show="starsList.length === 0 && !isLoad"></not-found>
        </div>
    </div>
</template>
<script>
    import Login from 'components/login';
    import SearchHeader from 'components/searchHeader';
    import ListItems from 'components/listItems';
    import NotFound from 'components/notFound';

    export default {
        data () {
            return {
                shouldLogin: false,
                isScroll: true,
                notFoundMsg: 'no result found.'
            };
        },
        route: {
            data ({ from }) {
                this.$dispatch('footerChangeStateCtrl', '/stars');
                if (/(detail)/g.test(from.path)) this.initScrollPosition();
            }
        },
        ready () {
            this.shouldLogin = false;
            if (this.starsList.length === 0) {
                this.getStarsList();
            }
        },
        computed: {
            starsList () {
                return this.$store.getters.getStarsList;
            },
            starsLoadmoreIndex () {
                return this.$store.getters.getStarsLoadmoreIndex;
            },
            starsScrollPosition () {
                return this.$store.getters.getStarsScrollPosition;
            },
            isLoad () {
                return this.$store.getters.getLoad;
            }
        },
        methods: {
            setStarsList (params, isFirst) {
                return this.$store.dispatch('setStarsList', {
                    params,
                    isFirst
                });
            },
            setLoad (isLoad) {
                this.$store.dispatch('setLoad', {
                    isLoad
                });
            },
            setStarsCacheKeywords (keywords) {
                this.$store.dispatch('setStarsCacheKeywords', {
                    keywords
                });
            },
            setStarsLoadmoreIndex (index) {
                this.$store.dispatch('setStarsLoadmoreIndex', {
                    index
                });
            },
            setStarsScrollPosition (position) {
                this.$store.dispatch('setStarsScrollPosition', {
                    position
                });
            },
            initScrollPosition () {
                const dom = this.$el.querySelector('.list-content');
                if (!dom) return;

                const timeout = setTimeout(() => {
                    dom.scrollTop = this.starsScrollPosition;
                    clearTimeout(timeout);
                }, 100);
            },
            getStarsList () {
                this.setLoad(true);
                this.setStarsList({}).then(() => {
                    this.setLoad(false);
                    this.setStarsCacheKeywords('');
                }).catch(() => {
                    this.setLoad(false);
                    this.shouldLogin = true;
                });
            },
            scrollHandler () {
                if (!this.isScroll || this.shouldLogin || this.starsList.length === 0) return;

                const winH = window.screen.availHeight;
                const top = this.$el.querySelector('.list-content').scrollTop;
                const height = this.$el.querySelector('#list-items').offsetHeight;

                if ((winH + top) >= height - 500) {
                    this.isScroll = false;
                    this.$progress.start(3000);
                    const index = this.starsLoadmoreIndex + 1;
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
                    if (this.$el.querySelector('.list-content')) this.$el.querySelector('.list-content').scrollTop = 0;
                    this.shouldLogin = false;
                    this.setLoad(false);
                    this.setStarsLoadmoreIndex(1);
                    this.setStarsCacheKeywords(msg);
                });
            },
            setStarsScrollPosition () {
                const position = this.$el.querySelector('.list-content').scrollTop;
                this.setStarsScrollPosition(position);
            }
        },
        components: {
            Login,
            SearchHeader,
            ListItems,
            NotFound
        }
    };
</script>
