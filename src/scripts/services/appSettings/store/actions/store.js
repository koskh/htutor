// @flow
import _ from 'lodash';

import {SETTINGS_SAVE_REQUEST, SETTINGS_SAVE_FAILURE, SETTINGS_SAVE_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities/index';

import { setAppSettings } from '../../services/index';

export const store: ThunkAction = createAction(SETTINGS_SAVE_REQUEST);
export const cancel: ThunkAction = createAction(SETTINGS_SAVE_CANCEL);
export const failure: ThunkAction = createAction(SETTINGS_SAVE_FAILURE);


const Requests: Array<AjaxRequest> = [];


export function makeSave(appSettings: any) {
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



export function cancelSave() {
    return () => {
        _.each(Requests, req => {
            req.cancel('Operation canceled by the user.');
        });
    };
}
