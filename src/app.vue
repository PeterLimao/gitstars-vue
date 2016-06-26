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
    import Actions from 'actions';

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
        vuex: {
            actions: {
                setLanList: Actions.setLanList
            }
        },
        ready () {
            this.setLanList((success) => {
                if (success) {
                    this.isLoad = true;
                }
            });
        },
        store: Store
    };
</script>
