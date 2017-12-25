import * as React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import {toMatchImageSnapshot} from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import puppeteer from 'puppeteer';

import Dump from '../index';


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
    const tree = renderer.create(<Dump/>).toJSON();
    expect(tree).toMatchSnapshot();

});

test('renders correctly', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://192.168.1.8:3001');
    await  page.waitForSelector('.qa__home--body');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.goto('http://192.168.1.8:3001/home');
    await  page.waitForSelector('.qa__home--body');
    const screenshot1 = await page.screenshot();
    expect(screenshot1).toMatchImageSnapshot();

    await page.goto('http://192.168.1.8:3001/learn/1');
    await  page.waitForSelector('.qa__learn--body');
    const screenshot2 = await page.screenshot();
    expect(screenshot2).toMatchImageSnapshot();

    // expect(screenshot).toMatchImageSnapshot();

    await browser.close();
});
