import Vue from 'vue';
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
import VueAnimatedList from 'vue-animated-list';
import Progress from 'vue-progressbar';
import Zepto from 'webpack-zepto';
import App from './app.vue';
import { start } from './router';
import 'i18n';
import 'directives';
import 'libs/materialize/css/materialize.min.css';
import './assets/style/base';

Vue.config.debug = process.env.NODE_ENV === 'production';

window.Zepto = Zepto;

Vue.use(VueRouter);
Vue.use(VueTouch);
Vue.use(VueAnimatedList);
Vue.use(Progress);

start(App, 'app');
