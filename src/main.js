/**
 * main js
 * @author PeterL
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Filter from './filter';
import RouterMap from './router';
import './assets/css/base';
import 'materialize-css/dist/css/materialize.min';

Vue.config.debug = process.env.NODE_ENV === 'production' ? false : true;

Vue.use(VueRouter);

Filter(Vue);

import App from './app';

let router = new VueRouter();

RouterMap(router);

router.start(App, 'app');
