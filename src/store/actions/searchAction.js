import * as Types from 'store/mutation-types';
import { search } from 'api';
import { getHotwords } from 'api';

export const setSearch = function ({ commit }, { isSearch }) {
    commit(Types['SET_SEARCH'], {
        isSearch
    });
};

export const setSearchTrendingList = function ({ commit }, { params, isFirst = true }) {
    return search(params).then((response) => {
        commit(Types['SET_SEARCH_TRENDING_LIST'], {
            list: response.data.items || [],
            isFirst
        });
        return true;
    });
};

export const setHotwords = function ({ commit }) {
    return getHotwords().then((response) => {
        commit(Types['SET_HOTWORDS'], {
            hotwords: response.data
        });
        return true;
    });
};

export const setSearchLoadmoreIndex = function ({ commit }, { index }) {
    commit(Types['SET_SEARCH_LOADMORE_INDEX'], {
        index
    });
};

export const setCacheKeywords = function ({ commit }, { keywords }) {
    commit(Types['SET_CACHE_KEYWORDS'], {
        keywords
    });
};

export const setSearchScrollPosition = function ({ commit }, { position }) {
    commit(Types['SET_SEARCH_SCROLL_POSITION'], {
        position
    });
};
