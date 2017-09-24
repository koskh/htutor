import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import ForwardVariantTest from '.';


describe('<ForwardVariantTest />', () => {
    it('renders without errors', () => {
        const wrapper = shallow(<ForwardVariantTest />);
        expect(wrapper).to.have.length(1);
    });

    it('has got this.soundBtn', () => {
        const wrapper = mount(<ForwardVariantTest />);
        expect(wrapper.soundBtn).not.be.null;
    });
});

