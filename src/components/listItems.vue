<style scoped>
    /*基本样式*/

    .card-title {
        color: #673ab7;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .card-action {
        display: flex;
    }

    .card-action > div {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .card-content > div {
        display: flex;
        align-items: center;
    }

    .star-item i {
        color: #ffeb3b;
    }

    img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        margin-right: 10px;
    }
</style>
<template>
        <div class="card" v-for="item in list">
            <div class="card-content">
                <div>
                    <img :src="item.icon" alt="" />
                    <span class="card-title">
                        {{item.name}}
                    </span>
                </div>
                <p>
                    {{item.desc}}
                </p>
            </div>
            <div class="card-action">
                <div class="code-item">
                    <i class="material-icons">code</i>
                    <span>{{item.language}}</span>
                </div>
                <div class="star-item">
                    <i class="material-icons">star</i>
                    <span>{{item.stars_count}}</span>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        props: [
            'list'
        ]
    };
</script>
