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
                <span slot="icon" class="icono-tiles"></span>
                <span slot="label">Home</span>
            </tabbar-item>
            <tabbar-item @click="router('/search')">
                <span slot="icon" class="icono-search"></span>
                <span slot="label">Discover</span>
            </tabbar-item>
            <tabbar-item @click="router('/more')">
                <span slot="icon" class="icono-comment"></span>
                <span slot="label">More</span>
            </tabbar-item>
        </tabbar>
    </footer>
</template>
<script>
    import Tabbar from 'vux-components/tabbar';
    import TabbarItem from 'vux-components/tabbar-item';

    export default {
        methods: {
            router (path) {
                this.$router.go({
                    path: path
                });
            }
        },
        components: {
            Tabbar,
            TabbarItem
        }
    };
</script>
