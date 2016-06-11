/**
 * main js
 * @author PeterL
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Progress from 'vue-progressbar';
import Filter from './filter';

import Icono from 'icono/dist/icono.min';
import Base from './assets/css/base';

Vue.config.debug = process.env.NODE_ENV === 'production' ? false : true;

Vue.use(Progress);

Filter(Vue);

import App from './app';

new Vue({
    el: 'body',
    components: {
        App
    }
});
