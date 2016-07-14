/**
 * actions for vuex
 * @author PeterL
 */
import {getLanguage} from 'api';
import {getTrending} from 'api';
import {search} from 'api';
import {getHotwords} from 'api';

export const setShowNav = ({dispatch}, isShow) => {
    dispatch('SET_SHOW_NAV', isShow);
};

export const setLoad = ({dispatch}, isLoad) => {
    dispatch('SET_LOAD', isLoad);
};

export const setSearch = ({dispatch}, isSearch) => {
    dispatch('SET_SEARCH', isSearch);
};

export const setCurrentLan = ({dispatch}, currentLan) => {
    dispatch('SET_CURRENT_LAN', currentLan);
};

export const setDetailValue = ({dispatch}, detailValue) => {
        dispatch('SET_DETAIL_VALUE', detailValue);
};

export const setLanList = ({dispatch}) => {
    return getLanguage().then((response) => {
        dispatch('SET_LAN_LIST', ['all'].concat(response.data));
        return true;
    });
};

export const setTredingList = ({dispatch}, type) => {
    return getTrending(type).then((response) => {
        dispatch('SET_TRENDING_LIST', response.data);
        return true;
    });
};

export const setSearchTredingList = ({dispatch}, params) => {
    return search(params).then((response) => {
        dispatch('SET_SEARCH_TRENDING_LIST', response.data.items);
        return true;
    });
};

export const setHotwords = ({dispatch}) => {
    return getHotwords().then((response) => {
        dispatch('SET_HOTWORDS', response.data);
        return true;
    });
};
