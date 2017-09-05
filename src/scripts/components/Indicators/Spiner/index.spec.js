import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Spiner from '.';

describe('components/Spiner', () => {
    it('renders without errors', () => {
        const dump = shallow(<Spiner />);
        expect(dump).to.have.length(1);
    });
    it('renders with sended classNames', () => {
        const className = 'abracadabra';
        const dump = shallow(<Spiner className={className} />);
        expect(dump).to.have.length(1);
        expect(dump.hasClass(`${className}`)).to.eq(true);
    });
});
