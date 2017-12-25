import * as React from 'react';


import {toMatchImageSnapshot} from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import puppeteer from 'puppeteer';


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
