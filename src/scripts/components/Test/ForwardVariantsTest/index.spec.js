import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import VariantTest from '.';

describe('<VariantTest />', () => {
    it('renders without errors', () => {
        const component = shallow(<VariantTest />);
        expect(component).to.have.length(1);
    });

    it('simulates click event "Play sound"', () => {
        const spy = sinon.spy();
        VariantTest.prototype._onSoundClick = spy;

        const component = shallow(<VariantTest />);
        component.find('.js-sound').simulate('click');

        expect(spy.calledOnce).to.equal(true);
    });
    //
    // it('simulates click event "Answer"', () => {
    //     const spy = sinon.spy();
    //     AbstractTest.prototype._onAnswerClick = spy;
    //
    //     const component = shallow(<AbstractTest />);
    //     component.find('.js-answer').simulate('click');
    //
    //     expect(spy.calledOnce).to.equal(true);
    // });
});

