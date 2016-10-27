<style lang="less" scoped>
    #file-panel-pic {
        margin: 10px;
    }

    img {
        width: 100%;
    }
</style>
<template>
    <div id="file-panel-pic" v-lazy>
        <img :lazy-img="picSrc"/>
    </div>
</template>
<script>
    export default {
        props: {
            picSrc: {
                type: String,
                default: ''
            }
        }
    };
</script>
