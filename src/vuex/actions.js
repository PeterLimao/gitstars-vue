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
    setSearch ({dispatch}, isSearch) {
        dispatch('SET_SEARCH', isSearch);
    },
    setCurrentLan ({dispatch}, currentLan) {
        dispatch('SET_CURRENT_LAN', currentLan);
    },
    setDetailValue ({dispatch}, detailValue) {
        dispatch('SET_DETAIL_VALUE', detailValue);
    },
    setLanList ({dispatch}) {
        return Api.getLanguage().then((response) => {
            dispatch('SET_LAN_LIST', ['all'].concat(response.data));
            return true;
        });
    },
    setTredingList ({dispatch}, type) {
        return Api.getTrending(type).then((response) => {
            dispatch('SET_TRENDING_LIST', response.data);
            return true;
        });
    },
    setSearchTredingList ({dispatch}, params) {
        return Api.search(params).then((response) => {
            dispatch('SET_SEARCH_TRENDING_LIST', response.data.items);
            return true;
        });
    },
    setHotwords ({dispatch}) {
        return Api.getHotwords().then((response) => {
            dispatch('SET_HOTWORDS', response.data);
            return true;
        });
    }
};
