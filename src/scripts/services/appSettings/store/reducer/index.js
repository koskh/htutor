// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities/index';

export type ComponentStore = {
    id: ?any,
    data: ?any,
    error: ?any,
    isPending: boolean,
    isUpdating: boolean
}

const initialState: ComponentStore = {
    id: null,
    data: null,
    error: null,
    isPending: true,
    isUpdating: false
};

export const actions: ReducerActions = {
    [types.SETTINGS_REQUEST]: (state, { payload }) => nextState(state, { isPending: true, ...payload }),
    // //
    [types.SETTINGS_SUCCESS]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    // //
    [types.SETTINGS_FAILURE]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    //
    [types.SETTINGS_CANCEL]: state => nextState(state, { isPending: false}),

    // [types.SETTINGS_RESET]: () => ({ ...initialState }),
};

export default createReducer(initialState, actions);
