/**
 * actions for vuex
 * @author PeterL
 */
import Api from 'api';

export default {
    setShowNav ({dispatch}, isShow) {
        dispatch('SET_SHOW_NAV', isShow);
    },
    setLoad ({dispatch}, isLoad) {
        dispatch('SET_LOAD', isLoad);
    },
    setCurrentLan ({dispatch}, currentLan) {
        dispatch('SET_CURRENT_LAN', currentLan);
    },
    setLanList ({dispatch}, callback) {
        Api.getLanguage().then((response) => {
            dispatch('SET_LAN_LIST', ['all'].concat(response.data));
            callback(true);
        });
    },
    setTredingList ({dispatch}, callback, type) {
        Api.getTrending(type).then((response) => {
            dispatch('SET_TRENDING_LIST', response.data);
            callback(true);
        });
    },
    setSearchTredingList ({dispatch}, callback, params) {
        Api.search(params).then((response) => {
            dispatch('SET_SEARCH_TRENDING_LIST', response.data.items);
            callback(true);
        });
    },
    setHotwords ({dispatch}, callback) {
        Api.getHotwords().then((response) => {
            dispatch('SET_HOTWORDS', response.data);
            callback(true);
        });
    }
};
