<template>
    <div id="app">
        <welcome-loading></welcome-loading>
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
    import WelcomeLoading from 'components/welcomeLoading';
    import Store from 'store';
    import {setLanList} from 'actions';
    import {setLoad} from 'actions';
    import {setTredingList} from 'actions';
    import {setHotwords} from 'actions';

    export default {
        data () {
            return {
                welcomeContent: '',
                isWelcomeShow: false
            }
        },
        components: {
            'v-footer': Footer,
            Loading,
            WelcomeLoading
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
        created () {
            this.getHttp();
            this.rewriteUrl();
        },
        methods: {
            getHttp () {
                Promise.all([
                    this.setLanList(),
                    this.setTredingList(),
                    this.setHotwords()
                ]).then((responseList) => {
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
