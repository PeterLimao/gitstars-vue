<template>
    <div id="app">
        <progress :percent.sync="myProgress.percent" :options="myProgress.options"></progress>
        <welcome-loading></welcome-loading>
        <loading v-if="isLoad"></loading>
        <section>
            <router-view keep-alive></router-view>
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
            };
        },
        created () {
            this.getHttp();
        },
        ready () {
            this.$progress.setHolder(this.myProgress);
        },
        computed: {
            isLoad () {
                return this.$store.getters.getLoad;
            }
        },
        methods: {
            getHttp () {
                Promise.all([
                    this.setLanList(),
                    this.setHotwords()
                ]).then((responseList) => {
                    this.setLoad(false);
                });
            },
            setLanList () {
                return this.$store.dispatch('setLanList');
            },
            setHotwords () {
                return this.$store.dispatch('setHotwords');
            },
            setLoad (isLoad) {
                this.$store.dispatch('setLoad', {
                    isLoad
                });
            }
        },
        store: Store,
        components: {
            'v-footer': Footer,
            Loading,
            WelcomeLoading,
            Progress
        },
        events: {
            footerChangeStateCtrl (path) {
                this.$broadcast('footerChangeState', path);
            }
        }
    };
</script>
