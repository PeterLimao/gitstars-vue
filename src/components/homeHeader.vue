<style scoped>
    /*基础样式*/
    header {
        display: flex;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }

    header .left, header .right{
        width: 20%;
        text-align: center;
        line-height: 44px;
        height: 44px;
        overflow: hidden;
        word-wrap: normal;
        text-overflow: ellipsis;
    }

    .right i {
        color: #fff;
        padding-top: 8px;
    }

    header .main {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
    }

    .vux-tab-item {
        background: #673ab7;
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
