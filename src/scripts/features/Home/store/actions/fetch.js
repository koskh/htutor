// @flow
import _ from 'lodash';

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities/index';

// import { bd, common } from '../../../../services/api/index';

import { blocks} from '../../../../services/local_requests';

export const request: ThunkAction = createAction(FETCH_REQUEST);
export const success: ThunkAction = createAction(FETCH_SUCCESS);
export const failure: ThunkAction = createAction(FETCH_FAILURE);
// export const cancel: ThunkAction = createAction(FETCH_CANCEL);


const Requests: Array<AjaxRequest> = [];

export function makeFetch(blockId: number): Function {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null }));

        try {
            // // const request0 = bd.blocks({ blockId });
            //
            // const request1 = bd.block({ blockId });
            // Requests.push(request1);
            // const response = await request1.promise;
            //
            // // response.data.words = _.shuffle(response.data.words);

            const request_local = blocks(blockId);

            dispatch(success({ data:  request_local}));
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
