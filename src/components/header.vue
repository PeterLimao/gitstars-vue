<style scoped>
    /*基础样式*/
    header {
        display: flex;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.15);
    }

    header .left, header .right{
        flex-grow: 1;
        text-align: center;
        line-height: 44px;
    }

    .right i {
        color: #04be02;
    }

    header .main {
        flex-grow: 9;
    }
</style>
<template>
    <header>
        <div class="left item">
            All
        </div>
        <tab class="main item">
            <tab-item :selected="true">Trending</tab-item>
            <tab-item :selected="false">Showcases</tab-item>
        </tab>
        <div class="right item" @click="showNav">
            <i class="icono-hamburger"></i>
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
        methods: {
            showNav () {
                this.setShowNav(!this.isShowNav);
            }
        },
        components: {
            Tab,
            TabItem
        }
    };
</script>
