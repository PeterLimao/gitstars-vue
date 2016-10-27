import Vue from 'vue';
import Lazy from './lazy';

const directives = {
    lazy: Lazy
};

Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key]);
});
