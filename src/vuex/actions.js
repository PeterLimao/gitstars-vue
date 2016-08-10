/**
 * actions for vuex
 * @author PeterL
 */
import {getLanguage} from 'api';
import {getTrending} from 'api';
import {search} from 'api';
import {getHotwords} from 'api';
import {getStars} from 'api';

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

export const setSearchTredingList = ({dispatch}, params, isFirst = true) => {
    return search(params).then((response) => {
        dispatch('SET_SEARCH_TRENDING_LIST', response.data.items, isFirst);
        return true;
    });
};

export const setStarsList = ({dispatch}, params, isFirst = true) => {
    return getStars(params).then((response) => {
        dispatch('SET_STARS_LIST', response.data, isFirst);
        return true;
    });
};

export const setHotwords = ({dispatch}) => {
    return getHotwords().then((response) => {
        dispatch('SET_HOTWORDS', response.data);
        return true;
    });
};

export const setSearchLoadmoreIndex = ({dispatch}, index) => {
    dispatch('SET_SEARCH_LOADMORE_INDEX', index);
};

export const setStarsLoadmoreIndex = ({dispatch}, index) => {
    dispatch('SET_STARS_LOADMORE_INDEX', index);
};

export const setCacheKeywords = ({dispatch}, keywords) => {
    dispatch('SET_CACHE_KEYWORDS', keywords);
};

export const setStarsCacheKeywords = ({dispatch}, keywords) => {
    dispatch('SET_STARS_CACHE_KEYWORDS', keywords);
};

export const setTrendingScrollPosition = ({dispatch}, position) => {
    dispatch('SET_TRENDING_SCROLL_POSITION', position);
};

export const setSearchScrollPosition = ({dispatch}, position) => {
    dispatch('SET_SEARCH_SCROLL_POSITION', position);
};

export const setStarsScrollPosition = ({dispatch}, position) => {
    dispatch('SET_STARS_SCROLL_POSITION', position);
};
