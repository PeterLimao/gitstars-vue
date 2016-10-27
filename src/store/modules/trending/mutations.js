import * as Types from 'store/mutation-types';

const mutations = {
    [Types['SET_CURRENT_LAN']] (state, { currentLan }) {
        state.currentLan = currentLan;
    },
    [Types['SET_SHOW_NAV']] (state, { isShow }) {
        state.showNav = isShow;
    },
    [Types['SET_TRENDING_SCROLL_POSITION']] (state, { position }) {
        state.trendingScrollPosition = position;
    },
    [Types['SET_LAN_LIST']] (state, { list }) {
        state.languageList = list;
    },
    [Types['SET_TRENDING_LIST']] (state, { list }) {
        state.trendingList = list;
    }
};

export default mutations;
