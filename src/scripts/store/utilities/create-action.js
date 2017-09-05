// @flow

export default (type: string, payloadCreator: Function = x => x): Function => (arg: Array<any>): ReduxAction => {
    if (typeof payloadCreator !== 'function')
        throw new Error('The createPayload must be a function or undefined');


    const payload = payloadCreator(arg);
    return { type, payload };
};
