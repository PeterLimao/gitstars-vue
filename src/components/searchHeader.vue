<style scoped>
    /*基本样式*/
    header {
        height: 44px;
        background: #fff;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
    }

    input {
        margin-left: 10px;
        font-size: 20px;
        border: 0px;
        padding: 10px 0;
        height: 21px;
    }

    i {
        line-height: 44px;
        color: #888;
    }

    input[type=text]:focus {
        border-bottom-color: #673ab7;
        box-shadow: 0 1px 0 0 #673ab7;
    }
</style>
<template>
    <header class="z-depth-1">
        <i class="material-icons">search</i>
        <input type="text" placeholder="Search" @keyup.enter="execSearch" v-model="searchMsg">
    </header>
</template>
<script>
    export default {
        data () {
            return {
                searchMsg: ''
            }
        },
        methods: {
            execSearch () {
                this.searchMsg = '';
                console.log('go.....');
            }
        }
    };
</script>
