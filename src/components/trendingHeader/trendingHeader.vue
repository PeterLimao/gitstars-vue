<style lang="less" scoped>
    @import '~assets/style/common';

    /*基础样式*/
    header {
        .position(fixed, @z-index-level-0);
        display: flex;
        background: @base-puple;
        color: @base-white;
        top: 0;
        left: 0;
        width: 100%;
        .left, .right {
            @height: 44px;
            width: 20%;
            text-align: center;
            line-height: @height;
            height: @height;
            overflow: hidden;
            word-wrap: normal;
            text-overflow: ellipsis;
        }
        .main {
            width: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: @base-white;
            font-weight: bold;
        }
    }

    .right {
        i {
            color: @base-white;
            padding-top: 8px;
        }
    }
</style>
<template>
    <header class="z-depth-1">
        <div class="left item">
            {{ currentLan }}
        </div>
        <div class="main item">
            {{ $t('words.trending') }}
        </div>
        <div class="right item" v-touch:tap="setShowNav(true)">
            <i class="material-icons small">toc</i>
        </div>
    </header>
</template>
<script>
    export default {
        computed: {
            isShowNav () {
                return this.$store.getters.getShowNav;
            },
            currentLan () {
                return this.$store.getters.getCurrentLan;
            }
        },
        methods: {
            setShowNav (isShow) {
                this.$store.dispatch('setShowNav', {
                    isShow
                });
            }
        }
    };
</script>
