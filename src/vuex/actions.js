/**
 * actions for vuex
 * @author PeterL
 */
export default {
    setShowNav (store, isShow) {
        store.dispatch('SET_SHOW_NAV', isShow);
    }
};
