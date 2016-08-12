<style scoped>
    @import '../assets/style/common';

    /*基本样式*/
    .nav {
        position(fixed, $z-index-level-1);
        overflow-y: scroll;
        width: 300px;
        right: 0;
        top: 0;
        height: 100%;
        background: $base-white;
    }

    i {
        position(absolute);
        right: 10px;
        top: 10px;
        color: $base-puple;
    }

    ul {
        margin-top: 30px;
    }

    li {
        text-align: center;
        height: 35px;
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
        <div class="">
            <i class="material-icons small" v-touch:tap="setShowNav(false)">clear</i>
        </div>
        <ul>
            <li v-for="item in lanList" v-touch:tap="getType(item)">
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
    import {setShowNav} from 'actions';
    import {setTredingList} from 'actions';
    import {setLoad} from 'actions';
    import {setCurrentLan} from 'actions';

    export default {
        vuex: {
            getters: {
                isShowNav: (state) => state.showNav,
                lanList: (state) => state.languageList
            },
            actions: {
                setShowNav,
                setTredingList,
                setLoad,
                setCurrentLan
            }
        },
        methods: {
            getType (type) {
                this.setShowNav(false);
                this.setLoad(true);
                this.setTredingList(type).then((success) => {
                    if (success) {
                        if (success) {
                            this.setCurrentLan(type);
                            this.setLoad(false);
                            this.$dispatch('setTrendingScrollTop');
                        }
                    }
                });
            }
        }
    };
</script>
