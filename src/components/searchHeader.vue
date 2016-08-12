<style scoped>
    @import '../assets/style/common';

    /*基本样式*/
    header {
        position(absolute, $z-index-level-0);
        height: 44px;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
    }

    .search-btn {
        width: 50px;
        height: @width;
        position(fixed);
        background: $base-puple;
        color: $base-white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: (@width / 2);
        left: 5px;
        top: 5px;
    }

    .input-msg {
        background: $base-white;
        height: 50px;
        margin-top: 5px;
        margin-left: 20px;
        margin-right: 10px;
        width: 290px;
        border-radius: @height;
        base-trans();
        display: flex;
        align-items: center;
        i {
            margin-right: 5%;
            color: $base-puple;
        }
        input {
            height: 35px;
            border-bottom: 0;
            margin-bottom: 0;
            margin-left: 37px;
            margin-right: 10px;
        }
    }

    input[type=text]:focus {
        &:focus {
            border-bottom-color: $base-puple;
            box-shadow: 0 1px 0 0 $base-puple;
        }
    }

</style>
<template>
    <header>
        <div class="search-btn z-depth-1" v-touch:tap="showInput" :style="searchIconStyle">
            <i class="material-icons">search</i>
        </div>
        <div class="input-msg z-depth-1" :style="inputStyle">
            <input type="text" placeholder="Search" @keyup.enter="execSearch" v-model="searchMsg">
            <i class="material-icons" :style="{'font-size': fontSize}" v-touch:tap="execSearch">done</i>
        </div>
    </header>
</template>
<script>
    import { setSearchTredingList } from 'actions';
    import { setLoad } from 'actions';
    import { setSearch } from 'actions';
    import { setCacheKeywords } from 'actions';
    import { setSearchLoadmoreIndex } from 'actions';

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
                    background: '#673ab7'
                }
            }
        },
        methods: {
            showInput () {
                let width = this.isShowInput ? window.screen.availWidth + 'px' : '0';
                let color = this.isShowInput ? '#673ab7' : '#fff';
                let background = this.isShowInput ? '#fff' : '#673ab7';
                let fontSize = this.isShowInput ? '24px' : '0';

                this.inputStyle = { width };
                this.searchIconStyle = { color, background }
                this.fontSize = fontSize;
                this.isShowInput = !this.isShowInput;
            },
            execSearch () {
                this.$dispatch('searchResult', this.searchMsg);
            }
        }
    };
</script>
