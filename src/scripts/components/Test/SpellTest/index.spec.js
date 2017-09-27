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

    it('renders props', () => {
        const wrapper = shallow(<SpellTest {...questionData} />);

        expect(wrapper.find('.qa-quiz-word').contains(questionData.quizWord)).to.equal(true);
        expect(wrapper.find('.qa-quiz-spell')).to.have.length(1);
    });

    it('handles change input', () => {
        const onChangeSpy = sinon.spy();
        SpellTest.prototype._onChange = onChangeSpy;
        const wrapper = shallow(<SpellTest {...questionData} />);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: 'Test' } });
        expect(onChangeSpy.called).to.equal(true);
        // expect(onChangeSpy.calledWith(NodeName, ComponentValue)).to.equal(true);
    });

    it('right input call onAnswer(right)', () => {
        const onAnswerSpy = sinon.spy();

        const wrapper = shallow(<SpellTest {...questionData} onAnswer={onAnswerSpy} />);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: questionData.quizWord } });
        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: questionData.quizWord } });

        expect(onAnswerSpy.calledWith(true)).to.equal(true);
        expect(onAnswerSpy.calledOnce).to.equal(true);
    });
});

