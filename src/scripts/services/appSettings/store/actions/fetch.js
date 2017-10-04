// @flow
import _ from 'lodash';

import { SETTINGS_REQUEST, SETTINGS_SUCCESS, SETTINGS_FAILURE, SETTINGS_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities/index';

import { getAppSettings, setAppSettings } from '../../services/index';

export const request: ThunkAction = createAction(SETTINGS_REQUEST);
export const success: ThunkAction = createAction(SETTINGS_SUCCESS);
export const failure: ThunkAction = createAction(SETTINGS_FAILURE);
export const cancel: ThunkAction = createAction(SETTINGS_CANCEL);


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
