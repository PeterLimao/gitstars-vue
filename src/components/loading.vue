<style>
    /*基本样式*/
    #loading {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 810;
    }

    .outer {
        position: absolute;
        width: 70px;
        height: 70px;
        background: #fff;
        border-radius: 5px;
        left: 50%;
        top: 50%;
        margin-left: -35px;
        margin-top: -35px;
    }

    .preloader-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -18px;
        margin-top: -18px;
    }

    .spinner-layer {
        border-color: #673ab7;
    }
</style>
<template>
    <div id="loading" :style="loadingStyle">
        <div class="outer z-depth-1">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'loadingStyle'
        ]
    }
</script>
