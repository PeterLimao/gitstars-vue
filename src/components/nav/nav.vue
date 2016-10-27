<style lang="less" scoped>
    @import "~assets/style/common";

    /*基本样式*/
    .nav {
        overflow-y: scroll;
        width: 300px;
        .position(fixed, @z-index-level-1);
        right: 0;
        top: 0;
        height: 100%;
        background: @base-white;
    }

    i {
        .position(absolute);
        right: 10px;
        top: 10px;
        color: @base-puple;
    }

    ul {
        margin-top: 30px;
    }

    li {
        @height: 35px;
        text-align: center;
        height: @height;
        line-height: @height;
    }

    /*过渡动画*/
    .nav-transition {
        transition: all .3s ease;
    }

    .nav-enter, .nav-leave {
        transform: translateX(100%);
    }
</style>
<template>
    <div v-show="isShowNav" class="nav z-depth-1" transition="nav">
        <div>
            <i class="material-icons small" v-touch:tap="setShowNav(false)">clear</i>
        </div>
        <ul>
            <li v-for="item in lanList" v-touch:tap="getType(item)">
                {{ item }}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        computed: {
            isShowNav () {
                return this.$store.getters.getShowNav;
            },
            lanList () {
                return this.$store.getters.getLanguageList;
            }
        },
        methods: {
            getType (type) {
                this.setShowNav(false);
                this.setLoad(true);
                this.setTrendingList(type).then((success) => {
                    if (success) {
                        if (success) {
                            this.setCurrentLan(type);
                            this.setLoad(false);
                            this.$dispatch('setTrendingScrollTop');
                        }
                    }
                });
            },
            setShowNav (isShow) {
                this.$store.dispatch('setShowNav', {
                    isShow
                });
            },
            setTrendingList (type) {
                return this.$store.dispatch('setTrendingList', {
                    type
                });
            },
            setLoad (isLoad) {
                this.$store.dispatch('setLoad', {
                    isLoad
                });
            },
            setCurrentLan (currentLan) {
                this.$store.dispatch('setCurrentLan', {
                    currentLan
                });
            }
        }
    };
</script>
