/**
 * actions for vuex
 * @author PeterL
 */
import Api from 'api';

export default {
    setShowNav ({dispatch}, isShow) {
        dispatch('SET_SHOW_NAV', isShow);
    },
    setLanList ({dispatch}, callback) {
        Api.getLanguage().then((response) => {
            dispatch('SET_LAN_LIST', response.data);
            callback(true);
        });
    },
    setTredingList ({dispatch}, callback, type) {
        Api.getTrending(type).then((response) => {
            dispatch('SET_TRENDING_LIST', response.data);
            callback(true);
        });
    }
};
