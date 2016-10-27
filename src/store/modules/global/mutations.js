import * as Types from 'store/mutation-types';

const mutations = {
    [Types['SET_LOAD']] (state, { isLoad }) {
        state.isLoad = isLoad;
    },
    [Types['SET_DETAIL_VALUE']] (state, { detailValue }) {
        state.detailValue = detailValue;
    }
};

export default mutations;
