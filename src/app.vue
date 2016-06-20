<style>
@import "~vux/dist/vux.css";
</style>
<template>
    <div id="app">
        <loading v-if="!isLoad"></loading>
        <section v-else>
            <router-view></router-view>
            <v-footer></v-footer>
        </section>
    </div>
</template>
<script>
    import Footer from 'components/footer';
    import Loading from 'components/loading';

    import Store from 'store';

    export default {
        data () {
            return {
                isLoad: false
            }
        },
        components: {
            'v-footer': Footer,
            Loading
        },
        ready () {
            setTimeout(() => {
                this.isLoad = true;
            }, 2000);
        },
        store: Store
    };
</script>
