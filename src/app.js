/**
 * main js
 * @author PeterL
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
import VueAnimatedList from 'vue-animated-list';
import VueLazyload from 'vue-lazyload';
import Progress from 'vue-progressbar';

import loadingImg from './assets/img/9.pic.jpg';
import './assets/css/base';

Vue.config.debug = process.env.NODE_ENV === 'production' ? false : true;

Vue.use(VueRouter);
Vue.use(VueTouch);
Vue.use(VueAnimatedList);
Vue.use(Progress);
Vue.use(VueLazyload, {
    loading: loadingImg,
    error: loadingImg,
    try: 3
});

import * as DirectiveMap from './directive';

Object.keys(DirectiveMap).forEach((key) => {
    Vue.directive(key, DirectiveMap[key]);
});

import App from './app.vue';
import RouterMap from './router';

let router = new VueRouter();

RouterMap(router);

router.start(App, 'app');
