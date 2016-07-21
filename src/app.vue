<template>
    <div id="app">
        <progress :percent.sync="myProgress.percent" :options="myProgress.options"></progress>
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
    import Progress from 'vue-progressbar/vue-progressbar.vue';
    import Store from 'store';
    import {setLanList} from 'actions';
    import {setLoad} from 'actions';
    import {setTredingList} from 'actions';
    import {setHotwords} from 'actions';

    export default {
        data () {
            return {
                welcomeContent: '',
                isWelcomeShow: false,
                myProgress: {
                    percent: 0,
                    options: {
                        show: true,
                        canSuccess: true,
                        color: '#673ab7',
                        failedColor: 'red',
                        height: '3px'
                    }
                }
            }
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
        ready () {
            this.$progress.setHolder(this.myProgress);
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
        store: Store,
        components: {
            'v-footer': Footer,
            Loading,
            WelcomeLoading,
            Progress
        }
    };
</script>
