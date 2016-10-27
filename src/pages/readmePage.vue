<style lang="less" scoped>
    @import '~assets/style/common';

    /*基本样式*/
    #readme-detail {
        .position(absolute, @z-index-level-2);
        left: 0;
        right: 0;
        width: 100%;
        min-height: 100%;
        background: @base-gray;
        overflow-y: scroll;
        padding: 50px 0;
    }

    .back-btn {
        @width: 50px;
        .position(fixed, @z-index-level-4);
        right: 0;
        top: 0;
        color: @base-puple;
        width: @width;
        height: @width;
        display: flex;
        border-radius: @width / 2;
        align-items: center;
        justify-content: center;
    }

    /*动画样式*/
    .open-transition {
        transition: all 0.3s ease;
    }

    .open-enter, .open-leave {
        transform: translateX(-100%);
    }
</style>
<template>
    <div id="readme-detail" transition="open" :style="readmeDetailStyle">
        <loading v-if="isLoading"></loading>
        <div class="back-btn" v-touch:tap="close">
            <i class="material-icons">clear</i>
        </div>
        <file-nav :owner="detailValue.owner" :repo="detailValue.repo"></file-nav>
        <readme :owner="detailValue.owner" :repo="detailValue.repo"></readme>
        <not-found v-if="isNotFound" type="noReadme"></not-found>
    </div>
</template>
<script>
    import { getReadme } from 'api';
    import { Base64 } from 'js-base64';
    import FileNav from 'components/fileNav';
    import NotFound from 'components/notFound';
    import Readme from 'components/readme';
    import Loading from 'components/loading';

    export default {
        data () {
            return {
                isLoading: false,
                isNotFound: false,
                readmeDetailStyle: {}
            };
        },
        route: {
            activate () {
                this.isLoading = true;
                getReadme({
                    owner: this.detailValue.owner,
                    repo: this.detailValue.repo
                }).then((response) => {
                    return this.$http.get(response.data.url);
                }).then((response) => {
                    this.isLoading = false;
                    this.$broadcast('loadReadme', Base64.decode(response.data.content));
                }).catch((error) => {
                    this.isLoading = false;
                    if (error.status === 404) {
                        this.isNotFound = true;
                    }
                });
            }
        },
        computed: {
            detailValue () {
                return this.$store.getters.getDetailValue;
            }
        },
        methods: {
            close () {
                this.$route.router.go(this.detailValue.backUrl);
                this.$broadcast('hideFileNav');
                this.setLoad(false);
                this.$broadcast('loadReadme', '');
                this.isNotFound = false;
            },
            setLoad (isLoad) {
                this.$store.dispatch('setLoad', {
                    isLoad
                });
            }
        },
        events: {
            isHiddenScroll (isHidden) {
                this.readmeDetailStyle = {};
                if (isHidden) {
                    this.readmeDetailStyle = { 'overflow-y': 'hidden', 'height': '100%' };
                }
            }
        },
        components: {
            FileNav,
            Readme,
            Loading,
            NotFound
        }
    };
</script>
