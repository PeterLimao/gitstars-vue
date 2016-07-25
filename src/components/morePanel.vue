<style scoped>
    /*基本样式*/
    .list-content {
        padding: 20px 10px;
        padding-bottom: 50px;
    }
</style>
<template>
    <div id="more-panel">
        <login-page v-if="shouldLogin"></login-page>
        <div class="star-panel" v-else>
            <search-header></search-header>
            <div class="list-content" v-else>
                <list-items :list="starsList"></list-items>
            </div>
        </div>
    </div>
</template>
<script>
    import LoginPage from 'components/loginPage';
    import SearchHeader from 'components/searchHeader';
    import ListItems from 'components/listItems';
    import {setStarsList} from 'actions';
    import {setLoad} from 'actions';

    export default {
        data () {
            return {
                shouldLogin: false
            }
        },
        vuex: {
            getters: {
                starsList: (state) => state.starsList
            },
            actions: {
                setStarsList,
                setLoad
            }
        },
        ready () {
            this.shouldLogin = false;
            this.getStarsList();
        },
        methods: {
            getStarsList () {
                this.setLoad(true);
                this.setStarsList({}).then((response) => {
                    this.setLoad(false);
                }).catch((err) => {
                    this.setLoad(false);
                    this.shouldLogin = true;
                });
            }
        },
        components: {
            LoginPage,
            SearchHeader,
            ListItems
        }
    };
</script>
