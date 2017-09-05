// @flow
import _ from 'lodash';
//
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_CANCEL, LOGOUT } from '../constants';
import { createAction } from '../../../../store/utilities';
//
import { auth } from '../../../../services/api';
//
export const request: ThunkAction = createAction(LOGIN_REQUEST);
export const success: ThunkAction = createAction(LOGIN_SUCCESS);
export const failure: ThunkAction = createAction(LOGIN_FAILURE);
export const cancel: ThunkAction = createAction(LOGIN_CANCEL);
export const logout: ThunkAction = createAction(LOGOUT);
//
//
const Requests: Array<AjaxRequest> = [];
//
export function makeLogin(): Function {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null }));

        try {
            const request1 = auth.login({ userId: 'user123', method: 'post', data: { userId: 'user123' } });
            Requests.push(request1);
            const response1 = await request1.promise;

            // const request2 = common.references2({ userId: 123, method: 'post', data: response1.data });
            // Requests.push(request2);
            // const response2 = await request2.promise;

            const response = { ...response1.data };
            // console.log(response);

            dispatch(success({ data: response }));
        } catch (error) {
            dispatch(failure({ error }));
        }
    };
}
//
//
export function cancelLogin() {
    return () => {
        _.each(Requests, req => {
            req.cancel('Operation canceled by the user.');
        });
    };
}
//
// export function makeLogout() {
//     return () => {
//         _.each(Requests, req => {
//             req.cancel('Operation canceled by the user.');
//         });
//     };
// }
