import { expect } from 'chai';

import createReducer from './create-reducer';
import nextState from './next-state';

const Types = {
    Type1: 'TEST_TYPE1',
    Type2: 'TEST_TYPE2',
    Type3: 'TEST_TYPE3',
};

const InitalState = { isSmph: undefined };

const actions = {
    [Types.Type1]: state => nextState(state, { type1: true }), // без payload
    [Types.Type2]: (state, { payload }) => nextState(state, { type2: payload }), // с payload
};

const reducer = createReducer(InitalState, actions);

describe('createReducer ', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.eql(InitalState);
    });

    it('should handles types', () => {
        expect(reducer({}, { type: [Types.Type1] })).to.eql({ type1: true });
        expect(reducer({}, { type: [Types.Type1], payload: undefined })).to.eql({ type1: true });

        expect(reducer({}, { type: [Types.Type2], payload: undefined })).to.eql({ type2: undefined });
        expect(reducer({}, { type: [Types.Type2], payload: 42 })).to.eql({ type2: 42 });
    });
});
