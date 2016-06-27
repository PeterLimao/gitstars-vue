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
        flex-grow: 9;
    }

    .vux-tab-item {
        background: #673ab7;
    }
</style>
<template>
    <header class="deep-purple z-depth-1">
        <div class="left item">
            All
        </div>
        <tab class="main item" default-color="#fff" active-color="#fff">
            <tab-item :selected="true">Trending</tab-item>
            <tab-item :selected="false">Showcases</tab-item>
        </tab>
        <div class="right item" @click="setShowNav(true)">
            <i class="material-icons small">toc</i>
        </div>
    </header>
</template>
<script>
    import Tab from 'vux-components/tab';
    import TabItem from 'vux-components/tab-item';
    import Actions from 'actions';

    export default {
        vuex: {
            getters: {
                isShowNav (state) {
                    return state.showNav;
                }
            },
            actions: {
                setShowNav: Actions.setShowNav
            }
        },
        components: {
            Tab,
            TabItem
        }
    };
</script>
