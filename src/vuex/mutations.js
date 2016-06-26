/**
 * state for mutations
 * @author PeterL
 */
export default {
    SET_SHOW_NAV (state, isShow) {
        let flag = isShow ? true : false;
        state.showNav = flag;
    },
    SET_LAN_LIST (state, list) {
        state.languageList = list;
    }
};
