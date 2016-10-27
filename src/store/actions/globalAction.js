import * as Types from 'store/mutation-types';

export const setLoad = ({ commit }, { isLoad }) => {
    commit(Types['SET_LOAD'], {
        isLoad
    });
};

export const setDetailValue = ({ commit }, { detailValue }) => {
    commit(Types['SET_DETAIL_VALUE'], {
        detailValue
    });
};
