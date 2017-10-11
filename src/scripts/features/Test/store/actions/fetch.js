// @flow
import _ from 'lodash';

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities/index';

import { bd, common } from '../../../../services/api';

export const request: ThunkAction = createAction(FETCH_REQUEST);
export const success: ThunkAction = createAction(FETCH_SUCCESS);
export const failure: ThunkAction = createAction(FETCH_FAILURE);
export const cancel: ThunkAction = createAction(FETCH_CANCEL);


const Requests: Array<AjaxRequest> = [];

export function makeFetch(blockId: number, lessonId: string): Function {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null }));

        try {
            if (!lessonId) {
                const randomLesson = bd.randomLesson({blockId});
                Requests.push(randomLesson);
                const responseRandomLesson = await randomLesson.promise;
                // eslint-disable-next-line
                lessonId = responseRandomLesson.data.data.lessonId;
            }

            const request1 = bd.lessonTest({ blockId, lessonId });
            Requests.push(request1);
            const response = await request1.promise;

            response.data.data.words = _.shuffle(response.data.data.words);

            dispatch(success({ data: response.data.data }));
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
