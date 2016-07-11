/**
 * main js
 * @author PeterL
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
import VueAnimatedList from 'vue-animated-list';
import VueLazyload from 'vue-lazyload';
import Filter from './filter';
import RouterMap from './router';
import loadingImg from './assets/img/9.pic.jpg';
import './assets/css/base';

Vue.config.debug = process.env.NODE_ENV === 'production' ? false : true;

Vue.use(VueRouter);
Vue.use(VueTouch);
Vue.use(VueAnimatedList);
Vue.use(VueLazyload, {
    loading: loadingImg,
    error: loadingImg,
    try: 3
});

Filter(Vue);

import App from './app.vue';

let router = new VueRouter();

RouterMap(router);

router.start(App, 'app');
