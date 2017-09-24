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
});

