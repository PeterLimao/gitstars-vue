import * as Types from 'store/mutation-types';

const mutations = {
    [Types['SET_SEARCH']] (state, { isSearch }) {
        state.isSearch = isSearch;
    },
    [Types['SET_CACHE_KEYWORDS']] (state, { keywords }) {
        state.cacheKeywords = keywords;
    },
    [Types['SET_SEARCH_LOADMORE_INDEX']] (state, { index }) {
        state.searchLoadmoreIndex = index;
    },
    [Types['SET_SEARCH_SCROLL_POSITION']] (state, { position }) {
        state.searchScrollPosition = position;
    },
    [Types['SET_HOTWORDS']] (state, { hotwords }) {
        state.hotwords = hotwords;
    },
    [Types['SET_SEARCH_TRENDING_LIST']] (state, { list, isFirst }) {
        if (isFirst) {
            state.searchTrendingList = list;
        } else {
            state.searchTrendingList = state.searchTrendingList.concat(list);
        }
    }
};

export default mutations;
