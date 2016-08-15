<style>
    /*基本样式*/
    #loading {
        position: fixed;
        width: 70px;
        height: 70px;
        left: 50%;
        top: 50%;
        margin-left: -35px;
        margin-top: -35px;
        z-index: 810;
        background: #fff;
        border-radius: 5px;
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
