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
                setLanList: Actions.setLanList,
                setTredingList: Actions.setTredingList
            }
        },
        ready () {
            let index = 0;
            this.setLanList((success) => {
                if (success) {
                    index++;
                    if (index === 2) {
                        this.isLoad = true;
                    }
                }
            });
            this.setTredingList((success) => {
                if (success) {
                    index++;
                    if (index === 2) {
                        this.isLoad = true;
                    }
                }
            });
        },
        store: Store
    };
</script>
