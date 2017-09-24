import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import ReverseVariantTest from '.';
import { foreignWordClasses } from '../ForwardVariantsTest';


const questionData = {
    quizWord: 'TestWord',
    rightVariants: ['right1', 'right2'],
    quizVariants: ['quiz1', 'right1', 'quiz3'],
    sounds: '/test/test.mp3',
    onAnswer: () => {}
};

describe('<ReverseVariantTest />', () => {
    it('renders without errors', () => {
        const wrapper = shallow(<ReverseVariantTest />);
        expect(wrapper).to.have.length(1);
    });

    it('has got this.soundBtn', () => {
        const wrapper = mount(<ReverseVariantTest />);
        expect(wrapper.soundBtn).to.not.be.null;
    });


    it('renders props', () => {
        const wrapper = shallow(<ReverseVariantTest {...questionData} />);

        expect(wrapper.find('.qa-quiz-word').contains(questionData.quizWord)).to.equal(true);
        expect(wrapper.find('.qa-quiz-variant')).to.have.length(3);
    });

    it('handles click on wrong answer', () => {
        const onAnswerSpy = sinon.spy();
        const wrapper = shallow(<ReverseVariantTest {...questionData} onAnswer={onAnswerSpy} />);

        wrapper.find('.qa-quiz-variant').first().simulate('click');
        wrapper.find('.qa-quiz-variant').first().simulate('click');

        expect(onAnswerSpy.calledOnce).to.equal(true);
        expect(onAnswerSpy.calledWith(false)).to.equal(true);
    });

    it('handles click on right answer', () => {
        const onAnswerSpy = sinon.spy();
        const wrapper = shallow(<ReverseVariantTest {...questionData} onAnswer={onAnswerSpy} />);

        wrapper.find('.qa-quiz-variant').at(1).simulate('click');

        expect(onAnswerSpy.calledOnce).to.equal(true);
        expect(onAnswerSpy.calledWith(true)).to.equal(true);
    });

    it('can use this.soundBtn on answerClick', () => {
        const playSoundSpy = sinon.spy();
        ReverseVariantTest.prototype._playSound = playSoundSpy;

        const wrapper = mount(<ReverseVariantTest {...questionData} />);
        wrapper.find('.qa-quiz-variant').first().simulate('click');

        expect(playSoundSpy.called).to.equal(true);
    });


    it('change color quiz-word on right answer', () => {
        const wrapper = shallow(<ReverseVariantTest {...questionData} />);
        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.default)).to.equal(true);

        wrapper.find('.qa-quiz-variant').at(1).simulate('click');
        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.right)).to.equal(true);
    });

    it('change color quiz-word on wrong answer', () => {
        const wrapper = shallow(<ReverseVariantTest {...questionData} />);
        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.default)).to.equal(true);

        wrapper.find('.qa-quiz-variant').at(0).simulate('click');
        expect(wrapper.find('.qa-quiz-place').hasClass(foreignWordClasses.wrong)).to.equal(true);
    });
});

