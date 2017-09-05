
import { expect } from 'chai';
// import sinon from 'sinon';

import createAction from './create-action';

const Type = 'TEST_TYPE';

describe('createAction ', () => {
    it('create empty action object', () => {
        expect(createAction(Type)()).to.eql({ type: Type, payload: undefined });
    });
    it('throw if payloadCreator not function', () => {
        expect(() => createAction(Type, {})()).to.throw();
    });

    it('create action object with function payload ', () => {
        const payloadCreator = x => x;
        const action = createAction(Type, payloadCreator);
        expect(action(42)).to.eql({ type: Type, payload: 42 });
        expect(action({})).to.eql({ type: Type, payload: {} });
    });
});
