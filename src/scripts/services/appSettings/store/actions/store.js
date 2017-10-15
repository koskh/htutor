// @flow
import _ from 'lodash';

import {SETTINGS_STORE_REQUEST, SETTINGS_STORE_FAILURE, SETTINGS_STORE_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities/index';

import { setAppSettings } from '../../services/index';

export const store: ThunkAction = createAction(SETTINGS_STORE_REQUEST);
export const cancel: ThunkAction = createAction(SETTINGS_STORE_CANCEL);
export const failure: ThunkAction = createAction(SETTINGS_STORE_FAILURE);


const Requests: Array<AjaxRequest> = [];


export function makeStore(appSettings: any) {
    return async (dispatch: Dispatch): Promise<any> => {
        // dispatch(request({ error: null }));

        try {
            await setAppSettings(appSettings);
            dispatch(store(appSettings));

        } catch (error) {
            dispatch(failure({ error }));
        }
    };
}



export function cancelStore() {
    return () => {
        _.each(Requests, req => {
            req.cancel('Operation canceled by the user.');
        });
    };
}
