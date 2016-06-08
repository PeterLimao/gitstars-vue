/**
 * main js
 * @author PeterL
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Base from './assets/css/base';
import Filter from './filter';

Vue.debug.devTool = process.env.NODE_ENV === 'production' ? false : true;

Filter(Vue);

import App from './app';

new Vue({
    el: 'body',
    components: {
        App
    }
});
