// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities/index';

export type ComponentStore = {
    id: ?any,
    data: TestLesson,
    error?: any,
    isPending: boolean,
    isUpdating: boolean
}

const initialState: ComponentStore = {
    id: null,
    data: {
        id: 0,
        words:[{
            foreign: [],
            native: [],
            sounds: []
        }],
        title: ''
    },
    error: null,
    isPending: true,
    isUpdating: false
};

export const actions: ReducerActions = {
    [types.FETCH_REQUEST]: (state, { payload }) => nextState(state, { isPending: true, ...payload }),
    //
    [types.FETCH_SUCCESS]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),
    //
    [types.FETCH_FAILURE]: (state, { payload }) => nextState(state, { isPending: false, ...payload }),

    [types.FETCH_CANCEL]: state => nextState(state, { isPending: false }),

    // [types.UPDATE_REQUEST]: (state, { payload }) => nextState(state, { isUpdating: true, ...payload }),
    //
    // [types.UPDATE_SUCCESS]: state => nextState(state, { isUpdating: false }),
    //
    // [types.UPDATE_FAILURE]: (state, { error }) => nextState(state, { isUpdating: false, errors: { ...state.errors, updating: error.message } }),

    // [types.RESET]: () => ({ ...initialState })
};

export default createReducer(initialState, actions);
