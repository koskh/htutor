// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities/index';


const initialState: ComponentStore = {
    id: null,
    data: null,
    error: null,
    isPending: true,
    isUpdating: false
};

export const actions: ReducerActions = {
    [types.FETCH_REQUEST]: (state, { payload }) => nextState(state, { isPending: true, ...payload }),
    [types.FETCH_SUCCESS]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    [types.FETCH_FAILURE]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    [types.FETCH_CANCEL]: state => nextState(state, { isPending: false }),
    [types.RESET]: () => ({ ...initialState })
};

export default createReducer(initialState, actions);
