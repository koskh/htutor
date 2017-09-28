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
        const spyOnSoundClick = sinon.spy(SoundBtn.prototype, '_onSoundClick');
        const spyPlaySound = sinon.spy(SoundBtn.prototype, 'playSound');

        const component = shallow(<SoundBtn />);
        component.find('button').simulate('click');

        expect(spyOnSoundClick.calledOnce).to.equal(true);
        expect(spyPlaySound.calledOnce).to.equal(true);
    });
});

