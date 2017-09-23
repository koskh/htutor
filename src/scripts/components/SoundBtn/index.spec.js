import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SoundBtn from './index';

describe('<SoundBtn />', () => {
    it('renders without errors', () => {
        const component = shallow(<SoundBtn />);
        expect(component).to.have.length(1);
    });

    it('simulates click event "Play sound"', () => {
        const spy = sinon.spy();
        SoundBtn.prototype._onSoundClick = spy;

        const component = shallow(<SoundBtn />);
        component.find('button').simulate('click');

        expect(spy.calledOnce).to.equal(true);
    });
});

