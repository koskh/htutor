// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities';

const initialState: {} = {
    userId: null,
    userEmail: null,
    isPending: false,
};

export const actions: ReducerActions = {
    [types.LOGIN_REQUEST]: (state, { payload }) => nextState(state, { isPending: true, ...payload }),

    [types.LOGIN_SUCCESS]: (state, { payload }) => nextState(state, { isPending: false, data: payload.data }),

    [types.LOGIN_FAILURE]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),

    [types.LOGIN_FAILURE]: state => nextState(state, { isPending: false }),

    [types.LOGOUT]: () => ({ ...initialState })
};

export default createReducer(initialState, actions);
