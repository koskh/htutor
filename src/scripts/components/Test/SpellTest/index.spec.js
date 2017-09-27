import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import SpellTest from '.';
import { foreignWordClasses } from '../TemplateClass';


const questionData = {
    quizWord: 'TestWord',
    rightVariants: ['right1', 'right2'],
    quizVariants: ['quiz1', 'right1', 'quiz3'],
    sounds: '/test/test.mp3',
    onAnswer: () => {}
};

describe('<SpellTest />', () => {
    it('renders without errors', () => {
        const wrapper = shallow(<SpellTest />);
        expect(wrapper).to.have.length(1);
    });




});

