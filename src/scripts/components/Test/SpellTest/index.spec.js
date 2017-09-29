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

const questionDataWithCompositeRightAnswer = {
    quizWord: 'TestWord123',
    rightVariants: ['rightWord (V2, V3)', 'right123123'],
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


    it('handles help click', () => {
        const onChangeSpy = sinon.spy(SpellTest.prototype, '_onHelpClick');
        const wrapper = shallow(<SpellTest {...questionData} />);

        wrapper.find('.qa-quiz-help').simulate('click');
        expect(onChangeSpy.called).to.equal(true);
        // expect(onChangeSpy.calledWith(NodeName, ComponentValue)).to.equal(true);
    });

    it('adds letter when click help', () => {
        const wrapper = shallow(<SpellTest {...questionData} />);

        wrapper.find('.qa-quiz-help').simulate('click');
        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(questionData.rightVariants[0][0]);
        wrapper.find('.qa-quiz-help').simulate('click');
        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(`${questionData.rightVariants[0][0]}${questionData.rightVariants[0][1]}`);
    });

    it('change fist wrong letter when click help', () => {
        const wrapper = shallow(<SpellTest {...questionData} />);
        const firstWrongLetter = 't';
        const secondWrongLetter = 'y';

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: firstWrongLetter } });
        wrapper.find('.qa-quiz-help').simulate('click');
        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(questionData.rightVariants[0][0]);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: `${firstWrongLetter}${secondWrongLetter}` } });
        wrapper.find('.qa-quiz-help').simulate('click');
        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(`${questionData.rightVariants[0][0]}`);
        wrapper.find('.qa-quiz-help').simulate('click');
        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(`${questionData.rightVariants[0][0]}${questionData.rightVariants[0][1]}`);
    });

    it('adds letter when click help no more then right word', () => {
        const wrapper = shallow(<SpellTest {...questionData} />);

        for (let i = 0; i < questionData.rightVariants[0].length; i += 1)
            wrapper.find('.qa-quiz-help').simulate('click');

        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(questionData.rightVariants[0]);

        // one more click
        wrapper.find('.qa-quiz-help').simulate('click');
        expect(wrapper.find('.qa-quiz-spell').props().value).to.equal(questionData.rightVariants[0]);
    });

    it('calls onAnswer(right) on all helped letters', () => {
        const onAnswerSpy = sinon.spy();
        const wrapper = shallow(<SpellTest {...questionData} onAnswer={onAnswerSpy} />);

        for (let i = 0; i < questionData.rightVariants[0].length; i += 1)
            wrapper.find('.qa-quiz-help').simulate('click');

        expect(onAnswerSpy.calledWith(true)).to.equal(true);
    });

    it('handles change input', () => {
        const onChangeSpy = sinon.spy(SpellTest.prototype, '_onChange');
        const wrapper = shallow(<SpellTest {...questionData} />);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: 'Test' } });
        expect(onChangeSpy.called).to.equal(true);
        // expect(onChangeSpy.calledWith(NodeName, ComponentValue)).to.equal(true);
    });

    it('calls onAnswer(right) on right input ', () => {
        const onAnswerSpy = sinon.spy();
        const wrapper = shallow(<SpellTest {...questionData} onAnswer={onAnswerSpy} />);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: questionData.rightVariants[0] } });
        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: questionData.rightVariants[1] } });

        expect(onAnswerSpy.calledWith(true)).to.equal(true);
        expect(onAnswerSpy.calledOnce).to.equal(true);
    });

    it('change color quiz-word on right answer', () => {
        const onAnswerSpy = sinon.spy();
        const wrapper = shallow(<SpellTest {...questionData} onAnswer={onAnswerSpy} />);

        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.default)).to.equal(true);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: questionData.rightVariants[0] } });
        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.right)).to.equal(true);
    });

    it('is able to "trimmed" rightVariant to one word', () => {
        const rightAnswerForCompositedWord = 'rightWord';
        const onAnswerSpy = sinon.spy();
        const wrapper = shallow(<SpellTest {...questionDataWithCompositeRightAnswer} onAnswer={onAnswerSpy} />);

        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.default)).to.equal(true);

        wrapper.find('.qa-quiz-spell').simulate('change', { target: { value: rightAnswerForCompositedWord } });
        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.right)).to.equal(true);
    });
});

