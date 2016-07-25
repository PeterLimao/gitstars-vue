/**
 * vue-resource base config
 * @author PeterL
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import {API_ROOT} from './config';
import {GIT_API_ROOT} from './config';

Vue.use(VueResource);

export const trendingLanResources = Vue.resource(API_ROOT + '/trending/languages.json');

export const trendingListResources = Vue.resource(API_ROOT + '/trending.json');

export const hotwordsResources = Vue.resource(API_ROOT + '/search/hotwords.json');

export const searchResources = Vue.resource(API_ROOT + '/search.json');

export const getRepoFilesResources = Vue.resource(GIT_API_ROOT + '/repos{/owner}{/repo}/contents');

export const getConfigResources = Vue.resource(API_ROOT + '/config.json');

export const getStarsResources = Vue.resource(API_ROOT + '/stars.json');
