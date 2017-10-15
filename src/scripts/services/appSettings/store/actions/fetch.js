// @flow
import _ from 'lodash';

import { SETTINGS_FETCH_REQUEST, SETTINGS_FETCH_SUCCESS, SETTINGS_FETCH_FAILURE, SETTINGS_FETCH_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities/index';

import { getAppSettings } from '../../services/index';

export const request: ThunkAction = createAction(SETTINGS_FETCH_REQUEST);
export const success: ThunkAction = createAction(SETTINGS_FETCH_SUCCESS);
export const failure: ThunkAction = createAction(SETTINGS_FETCH_FAILURE);
export const cancel: ThunkAction = createAction(SETTINGS_FETCH_CANCEL);


const Requests: Array<AjaxRequest> = [];

export function makeFetch() {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null }));

        try {
            const appSettings = await getAppSettings();
            dispatch(success(appSettings));

        } catch (error) {
            dispatch(failure({ error }));
        }
    };
}


export function cancelFetch() {
    return () => {
        _.each(Requests, req => {
            req.cancel('Operation canceled by the user.');
        });
    };
}
