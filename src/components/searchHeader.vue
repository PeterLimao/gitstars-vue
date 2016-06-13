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
</style>
<template>
    <header>
        <div class="search-div">
            <i class="weui-icon weui_icon_search"></i>
            <span>Search</span>
            <i class="weui-icon weui_icon_clear"></i>
        </div>
    </header>
</template>
