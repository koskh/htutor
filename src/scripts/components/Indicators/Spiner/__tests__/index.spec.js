import * as React from 'react';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Spiner from '../index';

describe('components/Spiner', () => {
    test('renders without errors', () => {
        const dump = shallow(<Spiner/>);
        expect(dump).toHaveLength(1);
    });
    test('renders with sended classNames', () => {
        const className = 'abracadabra';
        const dump = shallow(<Spiner className={className}/>);
        expect(dump).toHaveLength(1);
        expect(dump.hasClass(`${className}`)).toBeTruthy();
    });

    test('renders correctly snapshot', () => {
        const tree = renderer.create(<Spiner/>).toJSON();
        expect(tree).toMatchSnapshot();

    });
});
