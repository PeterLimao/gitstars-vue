<style>
@import "~vux/dist/vux.css";
</style>
<template>
    <div id="app">
        <v-nav></v-nav>
        <section>
            <v-header></v-header>
            <progress :percent.sync="myProgress.percent", :options="myProgress.options"></progress>
            <router-view></router-view> 
            <v-footer></v-footer>
        </section>
    </div>
</template>
<script>
    import Header from 'components/header';
    import Footer from 'components/footer';
    import Nav from 'components/nav';
    import Progress from 'vue-progressbar/vue-progressbar.vue';

    import Store from 'store';

    export default {
        data () {
            return {
                myProgress: {
                    percent: 0,
                    options: {
                        show: true,
                        canSuccess: true,
                        color: 'rgb(143, 255, 199)',
                        failedColor: 'red',
                        height: '2px'
                    }
                }
            }
        },
        ready () {
            this.$progress.setHolder(this.myProgress);
            this.test();
        },
        methods: {
            start () {
                this.$progress.start();
            },
            increase (num) {
                this.$progress.increase(num);
            },
            finish () {
                this.$progress.finish();
            },
            test () {
                this.start();
                let timer = setInterval(() => {
                    this.increase(Math.random() * 10);
                    if (this.$progress.get() > 90) {
                        this.finish();
                        clearInterval(timer);
                    }
                }, 100);
            }
        },
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-nav': Nav,
            Progress
        },
        store: Store
    };
</script>
