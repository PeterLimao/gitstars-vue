<style scoped>
    /*基础样式*/
    .icono-tiles {
        margin: 0;
        margin-left: 10px;
    }

    .icono-search {
        margin: 0;
        margin-left: 2px;
    }

    .icono-comment {
        margin: 0;
        margin-left: -2px;
    }
</style>
<template>
    <footer>
        <tabbar>
            <tabbar-item @click="router('/home')">
                <span slot="icon" class="material-icons" :style="{color: homeColor}">equalizer</span>
                <span slot="label" :style="{color: homeColor}">Home</span>
            </tabbar-item>
            <tabbar-item @click="router('/search')">
                <span slot="icon" class="material-icons" :style="{color: searchColor}">search</span>
                <span slot="label" :style="{color: searchColor}">Discover</span>
            </tabbar-item>
            <tabbar-item @click="router('/more')">
                <span slot="icon" class="material-icons" :style="{color: moreColor}">more horiz</span>
                <span slot="label" :style="{color: moreColor}">More</span>
            </tabbar-item>
        </tabbar>
    </footer>
</template>
<script>
    import Tabbar from 'vux-components/tabbar';
    import TabbarItem from 'vux-components/tabbar-item';

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
        },
        components: {
            Tabbar,
            TabbarItem
        }
    };
</script>
