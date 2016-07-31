<style scoped>
    /*基本样式*/
    header {
        height: 44px;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }

    .search-btn {
        width: 50px;
        height: 50px;
        background: #673ab7;
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        position: fixed;
        left: 5px;
        top: 5px;
    }

    .input-msg {
        background: #fff;
        height: 50px;
        margin-top: 5px;
        margin-left: 20px;
        margin-right: 10px;
        width: 290px;
        border-radius: 25px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
    }

    .input-msg input {
        height: 35px;
        border-bottom: 0;
        margin-bottom: 0;
        margin-left: 37px;
        margin-right: 30px;
    }

    input[type=text]:focus {
        border-bottom-color: #673ab7;
        box-shadow: 0 1px 0 0 #673ab7;
    }

</style>
<template>
    <header>
        <div class="search-btn z-depth-1" v-touch:tap="showInput" :style="searchIconStyle">
            <i class="material-icons">search</i>
        </div>
        <div class="input-msg z-depth-1" :style="inputStyle">
            <input type="text" placeholder="Search" @keyup.enter="execSearch" v-model="searchMsg">
        </div>
    </header>
</template>
<script>
    import {setSearchTredingList} from 'actions';
    import {setLoad} from 'actions';
    import {setSearch} from 'actions';
    import {setCacheKeywords} from 'actions';
    import {setSearchLoadmoreIndex} from 'actions';

    export default {
        data () {
            return {
                searchMsg: '',
                isShowInput: false,
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
                let width = this.isShowInput ? '290px' : '0';
                let color = this.isShowInput ? '#673ab7' : '#fff';
                let background = this.isShowInput ? '#fff' : '#673ab7';
                this.inputStyle = {
                    width
                };
                this.searchIconStyle = {
                    color,
                    background
                }
                this.isShowInput = !this.isShowInput;
            },
            execSearch () {
                this.$dispatch('searchResult', this.searchMsg);
            }
        }
    };
</script>
