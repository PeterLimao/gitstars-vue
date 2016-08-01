<style scoped>
    #file-panel-pic {
        margin: 10px;
    }

    img {
        width: 100%;
    }
</style>
<template>
    <div id="file-panel-pic" v-lazy>
        <img :src="loadingImg" :lazy-img="picSrc"/>
    </div>
</template>
<script>
    import loadingImg from '../assets/img/9.pic.jpg';

    export default {
        data () {
            return {
                loadingImg
            }
        },
        props: {
            picSrc: {
                type: String,
                default: ''
            }
        }
    };
</script>
