import * as Types from 'store/mutation-types';

const mutations = {
    [Types['SET_STARS_CACHE_KEYWORDS']] (state, { keywords }) {
        state.starsCacheKeywords = keywords;
    },
    [Types['SET_STARS_LOADMORE_INDEX']] (state, { index }) {
        state.starsLoadmoreIndex = index;
    },
    [Types['SET_STARS_SCROLL_POSITION']] (state, { position }) {
        state.starsScrollPosition = position;
    },
    [Types['SET_STARS_LIST']] (state, { list, isFirst }) {
        if (isFirst) {
            state.starsList = list;
        } else {
            state.starsList = state.starsList.concat(list);
        }
    }
};

export default mutations;
