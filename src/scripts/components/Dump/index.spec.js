import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Dump from '.';

describe('components/dump', () => {
    it('renders without errors', () => {
        const dump = shallow(<Dump />);
        expect(dump).to.have.length(1);
    });

    it('contains children an expectation', () => {
        const dump = shallow(<Dump>
          <div className="testClass" />
        </Dump>);
        expect(dump.contains(<div className="testClass" />)).to.equal(true);
    });

    it('contains spec with an expectation', () => {
        const dump = shallow(<Dump>
          <div className="innerClass" />
        </Dump>);

        expect(dump.is('.outerClass')).to.equal(true);
        expect(dump.find('.innerClass').length).to.equal(1);
        expect(dump.find('.dump').exists()).to.equal(true);
    });

    it('simulates click events', () => {
        const onDivClick = sinon.spy();
        const dump = shallow(<Dump onClick={onDivClick}><div /></Dump>);
        dump.simulate('click');
        expect(onDivClick.calledOnce).to.equal(true);
    });
});
