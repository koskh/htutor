import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PendingIndicator from '.';
import Indicator from './_components/Indicator';

import Dump from '../../components/Dump';

const className = 'abracadabra';
const errorMessage = 'error Message';

describe('components/PendingIndicator', () => {
    it('renders without errors', () => {
        const dump = shallow(<PendingIndicator />);
        expect(dump).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(0);
    });

    it('renders indicator when pending', () => {
        const dump = shallow(<PendingIndicator pending="true"><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(1);
        expect(dump.find(Dump)).to.have.length(0);
    });

    it('renders Indicator ', () => {
        const dump = shallow(<PendingIndicator Indicator={Indicator} pending="true"><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(1);
    });

    it('Throw if not valid Indicator ', () => {
        expect(() => {
            shallow(<PendingIndicator Indicator pending="true"><Dump /></PendingIndicator>);
        }).to.throw();
    });

    it('renders Indicator with className', () => {
        const dump = shallow(<PendingIndicator pending="true" className={className}><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Indicator).hasClass(`${className}`)).to.eq(true);
    });

    it('renders  child without errors and no pending state', () => {
        const dump = shallow(<PendingIndicator><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Dump)).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(0);
    });

    it('renders error message', () => {
        const dump = shallow(<PendingIndicator message={errorMessage}><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Dump)).to.have.length(0);
        expect(dump.find(Indicator)).to.have.length(0);
        expect(dump.text()).to.equal(errorMessage);
        // expect(dump.contains(<div>{errorMessage}</div>)).to.equal(true);
    });
});
