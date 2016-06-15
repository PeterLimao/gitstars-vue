/**
 * vue-resource base config
 * @author PeterL
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import { API_ROOT } from './config';

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;

export const LoginResources = Vue.resource(API_ROOT + '/login');
