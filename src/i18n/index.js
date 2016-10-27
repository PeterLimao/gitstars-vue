import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Zh from './lang/zh';
import En from './lang/en';

Vue.use(VueI18n);

Vue.config.lang = window.navigator.language.split('-')[0];

const lang = {
    zh: Zh,
    en: En
};

Object.keys(lang).forEach((index) => {
    Vue.locale(index, lang[index]);
});

export const setLang = (lang) => { Vue.config.lang = lang; };
