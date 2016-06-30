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
    import Actions from 'actions';

    export default {
        components: {
            'v-footer': Footer,
            Loading
        },
        vuex: {
            getters: {
                isLoad (state) {
                    return state.isLoad;
                }
            },
            actions: {
                setLanList: Actions.setLanList,
                setLoad: Actions.setLoad,
                setTredingList: Actions.setTredingList,
                setHotwords: Actions.setHotwords
            }
        },
        ready () {
            let index = 0;
            let allRequest = 3;
            this.setLanList((success) => {
                if (success) {
                    index++;
                    if (index === allRequest) {
                        this.setLoad(false);
                    }
                }
            });
            this.setTredingList((success) => {
                if (success) {
                    index++;
                    if (index === allRequest) {
                        this.setLoad(false);
                    }
                }
            });
            this.setHotwords((success) => {
                if (success) {
                    index++;
                    if (index === allRequest) {
                        this.setLoad(false);
                    }
                }
            });
        },
        store: Store
    };
</script>
