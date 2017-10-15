// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities/index';

export type SettingsStore = {
    id: number,
    data: {
        currentBlockId: number
    },
    error: ?any,
    isPending: boolean,
    isUpdating: boolean
}

const initialState: SettingsStore = {
    id: 0,
    data: {
        currentBlockId: 0
    },
    error: null,
    isPending: true,
    isUpdating: false
};

export const actions: ReducerActions = {
    [types.SETTINGS_FETCH_REQUEST]: (state, { payload }) => nextState(state, { isPending: true, ...payload }),
    [types.SETTINGS_FETCH_SUCCESS]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    [types.SETTINGS_FETCH_FAILURE]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    [types.SETTINGS_FETCH_CANCEL]: state => nextState(state, { isPending: false }),

    [types.SETTINGS_RESET]: () => ({ ...initialState }),

    [types.SETTINGS_SAVE_REQUEST]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    [types.SETTINGS_SAVE_FAILURE]: state => nextState(state, { isPending: false }),
    [types.SETTINGS_SAVE_CANCEL]: state => nextState(state, { isPending: false })
};

export default createReducer(initialState, actions);
