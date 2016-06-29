<style scoped>
    /*基本样式*/
    #list-content {
        padding: 50px 10px;
    }

    .card-title {
        color: #673ab7;
        font-size: 20px;
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
    <section id="list-content">
        <div class="card" v-for="item in trendingList">
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
    </section>
</template>
<script>
    export default {
        vuex: {
            getters: {
                trendingList (state) {
                    return state.trendingList;
                }
            }
        }
    };
</script>
