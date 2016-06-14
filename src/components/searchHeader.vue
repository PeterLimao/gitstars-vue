<style scoped>
    /*基本样式*/
    header {
        height: 44px;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.15);
        background: #f3f3f3;
        padding-top: 10px;
    }

    .search-div {
        position: relative;
        padding-left: 4px;
        margin: 0 auto;
        height: 35px;
        background: #fff;
        width: 90%;
        border-radius: 5px;
        text-align: center;
        line-height: 35px;
    }

    .weui_icon_clear {
        position: absolute;
        right: 5px;
    }

    input {
        outline: none;
        border: 0;
        height: 34px;
        font-size: 18px;
        width: 90%;
    }

    /*动态样式*/
    .move {
        text-align: left;
    }
</style>
<template>
    <header>
        <div class="search-div" @click="setEdit(true)" :class="{'move': isEdit}">
            <i class="weui-icon weui_icon_search"></i>
            <span v-if="!isEdit">Search</span>
            <input type="text" placeholder="Search" v-if="isEdit" @keyup.enter="execSearch" v-model="searchMsg" autofocus>
            <i class="weui-icon weui_icon_clear" v-if="isEdit" @click.stop="setEdit(false)"></i>
        </div>
    </header>
</template>
<script>
    export default {
        data () {
            return {
                isEdit: false,
                searchMsg: ''
            }
        },
        methods: {
            setEdit (param) {
                this.isEdit = param;
            },
            execSearch () {
                this.searchMsg = '';
                console.log('go.....');
            }
        }
    };
</script>
