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
        background: #fff;
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
        <div v-touch:tap="router('/home')">
                <span slot="icon" class="material-icons" :style="{color: homeColor}">equalizer</span>
                <span slot="label" :style="{color: homeColor}">Trending</span>
        </div>
        <div v-touch:tap="router('/search')">
                <span slot="icon" class="material-icons" :style="{color: searchColor}">search</span>
                <span slot="label" :style="{color: searchColor}">Discover</span>
        </div>
        <div v-touch:tap="router('/more')">
                <span slot="icon" class="material-icons" :style="{color: moreColor}">star</span>
                <span slot="label" :style="{color: moreColor}">Star</span>
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
                this.$router.go({
                    path: path
                });
            },
            changeState (path) {
                if (path === '/home') {
                    this.homeColor = '#673ab7';
                    this.searchColor = '#888';
                    this.moreColor = '#888';
                }
                if (path === '/search') {
                    this.homeColor = '#888';
                    this.searchColor = '#673ab7';
                    this.moreColor = '#888';
                }
                if (path === '/more') {
                    this.homeColor = '#888';
                    this.searchColor = '#888';
                    this.moreColor = '#673ab7';
                }
            }
        }
    };
</script>
