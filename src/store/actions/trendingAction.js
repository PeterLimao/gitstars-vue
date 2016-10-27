import * as Types from 'store/mutation-types';
import { getLanguage } from 'api';
import { getTrending } from 'api';

export const setShowNav = function ({ commit }, { isShow }) {
    commit(Types['SET_SHOW_NAV'], {
        isShow
    });
};

export const setCurrentLan = function ({ commit }, { currentLan }) {
    commit(Types['SET_CURRENT_LAN'], {
        currentLan
    });
};

export const setLanList = function ({ commit }) {
    return getLanguage().then((response) => {
        commit(Types['SET_LAN_LIST'], {
            list: ['all'].concat(response.data)
        });
        return true;
    });
};

export const setTrendingList = function ({ commit }, { type }) {
    return getTrending(type).then((response) => {
        commit(Types['SET_TRENDING_LIST'], {
            list: response.data
        });
        return true;
    });
};

export const setTrendingScrollPosition = function ({ commit }, { position }) {
    commit(Types['SET_TRENDING_SCROLL_POSITION'], {
        position
    });
};
