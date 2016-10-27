<style lang="less" scoped>
    @import '~assets/style/common';

    /*基本样式*/
    .card-title {
        color: @base-puple;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .card-action {
        display: flex;
    }

    .card-action {
        & > div {
            display: flex;
            align-items: center;
            margin-right: 10px;
        }
    }

    .card-content {
        & > div {
            display: flex;
            align-items: center;
        }
    }

    .star-item {
        i {
            color: #ffeb3b;
        }
    }

    .increasing-item {
        color: #4caf50;
    }

    img {
        @width: 30px;
        width: @width;
        height: @width;
        border-radius: @width / 2;
        margin-right: 10px;
    }

    /*动画样式*/
    .item-transition {
        transition: all 0.5s ease;
    }

    .item-enter, .item-leave {
        transform: scale(0.1, 0.1);
    }
</style>
<template>
        <div id="list-items">
            <div class="card" v-for="item in list" transition="item" v-touch:tap="goDetail(item.name, item.readme)">
                <div class="card-content">
                    <div>
                        <img :lazy-img="item.icon">
                        <span class="card-title">
                            {{ item.name }}
                        </span>
                    </div>
                    <p>
                        {{ item.desc }}
                    </p>
                </div>
                <div class="card-action">
                    <div class="code-item">
                        <i class="material-icons">code</i>
                        <span>{{ item.language }}</span>
                    </div>
                    <div class="star-item">
                        <i class="material-icons">star</i>
                        <span>{{ item.stars_count }}</span>
                    </div>
                    <div class="increasing-item" v-if="item.stars_increasing >= 0">
                        <span>{{ item.stars_increasing }} stars today</span>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        methods: {
            goDetail (name, readmeUrl) {
                this.setScrollPosition();
                this.$route.router.go('/detail/' + name);
                this.setDetailValue({
                    owner: name.split('/')[0],
                    repo: name.split('/')[1],
                    backUrl: this.$route.path,
                    readmeUrl: readmeUrl
                });
            },
            setScrollPosition () {
                const path = this.$route.path;
                switch (path) {
                case '/trending':
                    this.$dispatch('setTrendingScrollPosition');
                    break;
                case '/search':
                    this.$dispatch('setSearchScrollPosition');
                    break;
                case '/stars':
                    this.$dispatch('setStarsScrollPosition');
                    break;
                default:
                    break;
                }
            },
            setDetailValue (detailValue) {
                this.$store.dispatch('setDetailValue', {
                    detailValue
                });
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            }
        }
    };
</script>
