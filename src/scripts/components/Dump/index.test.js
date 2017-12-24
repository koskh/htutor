import * as React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Dump from '.';


test('renders without errors', () => {
    const dump = shallow(<Dump />);
    expect(dump).toHaveLength(1);
});

test('contains children an expectation', () => {
    const dump = shallow(<Dump>
        <div className="testClass" />
    </Dump>);
    expect(dump.contains(<div className="testClass" />)).toBeTruthy();
});

test('contains spec with an expectation', () => {
    const dump = shallow(<Dump>
        <div className="innerClass" />
    </Dump>);

    expect(dump.is('.outerClass')).toBeTruthy();
    expect(dump.find('.innerClass')).toHaveLength(1);
    expect(dump.find('.dump').exists()).toBeTruthy();
});

test('simulates click events', () => {
    const onDivClick = sinon.spy();
    const dump = shallow(<Dump onClick={onDivClick}><div /></Dump>);
    dump.simulate('click');
    expect(onDivClick.calledOnce).toBeTruthy();
});

test('components/Dump renders correctly snapshot', ()=>{
    const component = renderer.create(<Dump/>);
    // console.log(component.toJSON());

    const tree = renderer.create(<Dump/>).toJSON();
    expect(tree).toMatchSnapshot();

});
