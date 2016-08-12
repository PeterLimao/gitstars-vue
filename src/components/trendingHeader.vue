<style scoped>
    @import '../assets/style/common';

    /*基础样式*/
    header {
        position(fixed, $z-index-level-0);
        display: flex;
        color: $base-white;
        top: 0;
        left: 0;
        width: 100%;
    }

    header {
        .left, .right {
            width: 20%;
            text-align: center;
            height: 44px;
            line-height: @height;
            overflow: hidden;
            word-wrap: normal;
            text-overflow: ellipsis;
        }
    }

    header {
        .main {
            width: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $base-white;
            font-weight: bold;
        }
    }

    .right {
        i {
            color: $base-white;
            padding-top: 8px;
        }
    }
</style>
<template>
    <header class="deep-purple z-depth-1">
        <div class="left item">
            {{currentLan}}
        </div>
        <div class="main item">
            Trending
        </div>
        <div class="right item" v-touch:tap="setShowNav(true)">
            <i class="material-icons small">toc</i>
        </div>
    </header>
</template>
<script>
    import {setShowNav} from 'actions';

    export default {
        vuex: {
            getters: {
                isShowNav: (state) => state.showNav,
                currentLan: (state) => state.currentLan
            },
            actions: {
                setShowNav
            }
        }
    };
</script>
