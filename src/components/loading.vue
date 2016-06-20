<style>
    /*基本样式*/
    #loading {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
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
</style>
<template>
    <div id="loading">
        <div class="outer">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-green-only">
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
