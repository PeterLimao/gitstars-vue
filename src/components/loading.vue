<style>
    @import '../assets/style/common';

    /*基本样式*/
    #loading {
        position(fixed, $z-index-level-2);
        width: 70px;
        height: @width;
        left: 50%;
        top: 50%;
        margin-left: -(@width / 2);
        margin-top: -(@width / 2);
        background: $base-white;
        border-radius: 5px;
    }

    .preloader-wrapper {
        position(absolute);
        left: 50%;
        top: 50%;
        margin-left: -18px;
        margin-top: @margin-left;
    }

    .spinner-layer {
        border-color: $base-puple;
    }
</style>
<template>
    <div id="loading" class="z-depth-1" :style="loadingStyle">
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
</template>
