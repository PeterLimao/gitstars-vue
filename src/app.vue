<template>
    <div id="app">
        <loading v-if="isLoad"></loading>
        <section>
            <router-view></router-view>
            <v-footer></v-footer>
        </section>
    </div>
</template>
<script>
    import Footer from 'components/footer';
    import Loading from 'components/loading';
    import Store from 'store';
    import {setLanList} from 'actions';
    import {setLoad} from 'actions';
    import {setTredingList} from 'actions';
    import {setHotwords} from 'actions';

    export default {
        components: {
            'v-footer': Footer,
            Loading
        },
        vuex: {
            getters: {
                isLoad: (state) => state.isLoad
            },
            actions: {
                setLanList,
                setLoad,
                setTredingList,
                setHotwords
            }
        },
        ready () {
            this.getHttp();
            this.rewriteUrl();
        },
        methods: {
            getHttp () {
                Promise.all([
                    this.setLanList(),
                    this.setTredingList(),
                    this.setHotwords()
                ]).then(() => {
                    this.setLoad(false);
                });
            },
            rewriteUrl () {
                if (this.$route.path === '/') {
                    this.$route.router.replace('/home');
                }
            }
        },
        store: Store
    };
</script>
