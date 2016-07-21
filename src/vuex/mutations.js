/**
 * state for mutations
 * @author PeterL
 */
export default {
    SET_SHOW_NAV (state, isShow) {
        let flag = isShow ? true : false;
        state.showNav = flag;
    },
    SET_LOAD (state, isLoad) {
        state.isLoad = isLoad;
    },
    SET_SEARCH (state, isSearch) {
        state.isSearch = isSearch;
    },
    SET_CURRENT_LAN (state, currentLan) {
        state.currentLan = currentLan;
    },
    SET_DETAIL_VALUE (state, detailValue) {
        state.detailValue = detailValue;
    },
    SET_LAN_LIST (state, list) {
        state.languageList = list;
    },
    SET_TRENDING_LIST (state, list) {
        state.trendingList = list;
    },
    SET_SEARCH_TRENDING_LIST (state, list) {
        state.searchTrendingList = state.searchTrendingList.concat(list);
    },
    SET_HOTWORDS (state, hotwords) {
        state.hotwords = hotwords;
    }
};
