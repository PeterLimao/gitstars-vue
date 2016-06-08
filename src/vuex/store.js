/**
 * store for vuex
 * @author PeterL
 */
 import Actions from 'actions';
 import Mutations from 'mutations';
 import State from 'state';
 import Vuex from 'vuex';
 import Vue from 'vue';

 export default new Vuex.Store({
     state: State,
     actions: Actions,
     mutations: Mutations
 });
