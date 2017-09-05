import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Indicator from '.';

describe('components/dump', () => {
    it('renders without errors', () => {
        const dump = shallow(<Indicator />);
        expect(dump).to.have.length(1);
    });
});
