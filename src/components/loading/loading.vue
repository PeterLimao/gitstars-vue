<style lang="less">
    @import '~assets/style/common';

    /*基本样式*/
    #loading {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.5);
        .position(fixed, @z-index-level-3);
    }

    .loading {
        @width: 70px;
        .position(fixed, @z-index-level-3);
        width: @width;
        height: @width;
        left: 50%;
        top: 50%;
        margin-left: -(@width / 2);
        margin-top: -(@width / 2);
        background: @base-white;
        border-radius: @width / 2;
    }

    .preloader-wrapper {
        .position(absolute);
        left: 50%;
        top: 50%;
        margin-left: -18px;
        margin-top: -18px;
    }

    /*动画样式*/

    .fade-transition {
        transition: all 0.3s ease;
        opacity: 1;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>
<template>
    <div id="loading" transition="fade">
        <div class="loading z-depth-1" :style="loadingStyle">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer" :style="{ 'border-color': color }">
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
        props: {
            color: {
                type: String,
                default: '#7569B2'
            }
        }
    };
</script>
