<style scoped>
    /*基础样式*/
    footer {
        position: fixed;
        z-index: 10;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        height: 55px;
        background: rgba(255,255,255,.8);
        backdrop-filter: brightness(1.5) blur(4px);
    }

    footer div {
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
<template>
    <footer class="z-depth-1">
        <div v-touch:tap="router('/trending')">
                <span class="material-icons" :style="{color: homeColor}">equalizer</span>
                <span :style="{color: homeColor}">Trending</span>
        </div>
        <div v-touch:tap="router('/search')">
                <span class="material-icons" :style="{color: searchColor}">search</span>
                <span :style="{color: searchColor}">Discover</span>
        </div>
        <div v-touch:tap="router('/stars')">
                <span class="material-icons" :style="{color: moreColor}">star</span>
                <span :style="{color: moreColor}">Star</span>
        </div>
    </footer>
</template>
<script>
    export default {
        data () {
            return {
                homeColor: '#673ab7',
                searchColor: '#888',
                moreColor: '#888'
            }
        },
        methods: {
            router (path) {
                this.changeState(path);
                this.$route.router.go({
                    path: path
                });
            },
            changeState (path) {
                if (path === '/trending') {
                    this.homeColor = '#673ab7';
                    this.searchColor = '#888';
                    this.moreColor = '#888';
                }
                if (path === '/search') {
                    this.homeColor = '#888';
                    this.searchColor = '#673ab7';
                    this.moreColor = '#888';
                }
                if (path === '/stars') {
                    this.homeColor = '#888';
                    this.searchColor = '#888';
                    this.moreColor = '#673ab7';
                }
            }
        }
    };
</script>
