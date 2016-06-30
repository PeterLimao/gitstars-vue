/**
 * vue-resource base config
 * @author PeterL
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import { API_ROOT } from './config';

Vue.use(VueResource);

export const trendingLanResources = Vue.resource(API_ROOT + '/trending/languages.json');
export const trendingListResources = Vue.resource(API_ROOT + '/trending.json');
export const showcasesResources = Vue.resource(API_ROOT + '/showcases.json');
export const showcasesDetailResources = Vue.resource(API_ROOT + '{/showcase_name}.json');
export const hotwordsResources = Vue.resource(API_ROOT + '/navi/repos/hotwords.json');
export const searchResources = Vue.resource(API_ROOT + '/navi/repos/search.json');
