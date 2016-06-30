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
        flex-grow: 1;
        text-align: center;
        line-height: 44px;
        height: 44px;
    }

    .right i {
        color: #fff;
        padding-top: 8px;
    }

    header .main {
        flex-grow: 8;
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
    import Actions from 'actions';

    export default {
        vuex: {
            getters: {
                isShowNav (state) {
                    return state.showNav;
                },
                currentLan (state) {
                    return state.currentLan;
                }
            },
            actions: {
                setShowNav: Actions.setShowNav
            }
        }
    };
</script>
