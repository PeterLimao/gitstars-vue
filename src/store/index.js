import Vuex from 'vuex';
import Vue from 'vue';

import Getters from './getters';
import Actions from './actions';

import Global from './modules/global';
import Search from './modules/search';
import Stars from './modules/stars';
import Trending from './modules/trending';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters: Getters,
    actions: Actions,
    modules: {
        global: Global,
        search: Search,
        stars: Stars,
        trending: Trending
    }
});

export default store;
