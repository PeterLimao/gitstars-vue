import * as Types from 'store/mutation-types';
import { getStars } from 'api';

export const setStarsList = function ({ commit }, { params, isFirst = true }) {
    return getStars(params).then((response) => {
        commit(Types['SET_STARS_LIST'], {
            list: response.data,
            isFirst
        });
        return true;
    });
};

export const setStarsLoadmoreIndex = function ({ commit }, { index }) {
    commit(Types['SET_STARS_LOADMORE_INDEX'], {
        index
    });
};

export const setStarsCacheKeywords = function ({ commit }, { keywords }) {
    commit(Types['SET_STARS_CACHE_KEYWORDS'], {
        keywords
    });
};

export const setStarsScrollPosition = function ({ commit }, { position }) {
    commit(Types['SET_STARS_SCROLL_POSITION'], {
        position
    });
};
