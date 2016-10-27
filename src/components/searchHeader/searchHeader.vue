<style lang="less" scoped>
    @import '~assets/style/common';

    /*基本样式*/
    header {
        height: 44px;
        display: flex;
        .position(absolute, @z-index-level-0);
        top: 0;
        left: 0;
        width: 100%;
    }

    .search-btn {
        @width: 50px;
        width: @width;
        height: @width;
        background: @base-puple;
        display: flex;
        color: @base-white;
        align-items: center;
        justify-content: center;
        border-radius: @width / 2;
        .position(fixed);
        left: 5px;
        top: 5px;
    }

    .input-msg {
        @height: 50px;
        background: @base-white;
        height: @height;
        margin-top: 5px;
        margin-left: 20px;
        margin-right: 10px;
        width: 290px;
        border-radius: @height / 2;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
    }

    .input-msg {
        input {
            height: 35px;
            border-bottom: 0;
            margin-bottom: 0;
            margin-left: 37px;
            margin-right: 10px;
        }
        i {
            margin-right: 5%;
            color: @base-puple;
        }
        input[type=text] {
            &:focus {
                border-bottom-color: @base-puple;
                box-shadow: 0 1px 0 0 @base-puple;
            }
        }
    }
</style>
<template>
    <header>
        <div class="search-btn z-depth-1" v-touch:tap="showInput" :style="searchIconStyle">
            <i class="material-icons">search</i>
        </div>
        <div class="input-msg z-depth-1" :style="inputStyle">
            <input type="text" :placeholder="$t('words.search')" @keyup.enter="execSearch" v-model="searchMsg">
            <i class="material-icons" :style="{ 'font-size': fontSize }" v-touch:tap="execSearch">done</i>
        </div>
    </header>
</template>
<script>
    export default {
        data () {
            return {
                searchMsg: '',
                isShowInput: false,
                fontSize: '0',
                inputStyle: {
                    width: '0'
                },
                searchIconStyle: {
                    color: '#fff',
                    background: '#7569B2'
                }
            };
        },
        methods: {
            showInput () {
                const width = this.isShowInput ? window.screen.availWidth + 'px' : '0';
                const color = this.isShowInput ? '#7569B2' : '#fff';
                const background = this.isShowInput ? '#fff' : '#7569B2';
                const fontSize = this.isShowInput ? '24px' : '0';

                this.inputStyle = { width };
                this.searchIconStyle = { color, background };
                this.fontSize = fontSize;
                this.isShowInput = !this.isShowInput;
            },
            execSearch () {
                this.$dispatch('searchResult', this.searchMsg);
            }
        }
    };
</script>
