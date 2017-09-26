import { expect } from 'chai';
// import sinon from 'sinon';

import generateQuiz from './';


const variantsForward = [
    { Component: () => {}, options: { isForward: true, mustHaveSound: false } }
];

const variantsReverse = [
    { Component: () => {}, options: { isForward: false, mustHaveSound: false } }
];

const variantsForwardAndSound = [
    { Component: () => {}, options: { isForward: false, mustHaveSound: false } },
    { Component: () => {}, options: { isForward: false, mustHaveSound: true } },
    { Component: () => {}, options: { isForward: true, mustHaveSound: false } },
];

const variantsOnlySound = [
    { Component: () => {}, options: { isForward: false, mustHaveSound: true } },
];

const word = {
    foreign: ['cure'],
    native: ['лечение, лекарство, излечивать', 'cредство решения какой-л. проблемы ', 'заготавливать, консервировать'],
    shuffledForeign: ['impact', 'gutter', 'tent', 'line', 'season', 'declare', 'cure', 'distinct', 'stay', 'time'],
    shuffledNative: ['сталь', 'отплатить, отомстить', 'заключать в себе, охватывать ', 'захват', 'в (в определен день недели, дату, момент дня)', 'необходимость, нужда', 'набивать (волосом, ватой плечики)', '(тех.) ручка; головка; кнопка', 'холодное оружие; меч, шпага', 'заготавливать, консервировать'],
    sounds: ['/sounds/c/cure.ogg']
};

const wordWithoutSound = {
    foreign: ['cure'],
    native: ['лечение, лекарство, излечивать', 'cредство решения какой-л. проблемы ', 'заготавливать, консервировать'],
    shuffledForeign: ['impact', 'gutter', 'tent', 'line', 'season', 'declare', 'cure', 'distinct', 'stay', 'time'],
    shuffledNative: ['сталь', 'отплатить, отомстить', 'заключать в себе, охватывать ', 'захват', 'в (в определен день недели, дату, момент дня)', 'необходимость, нужда', 'набивать (волосом, ватой плечики)', '(тех.) ручка; головка; кнопка', 'холодное оружие; меч, шпага', 'заготавливать, консервировать'],
    sounds: []
};

const additiveWordsQuantity = 4;
const rightAnswerQuantity = 1;

describe('generateQuiz()', () => {
    it('returns component and data for FORWARD way question', () => {
        const quiz = generateQuiz(word, variantsForward);

        expect(quiz.QuizComponent).to.exist;
        expect(quiz.QuizComponent).to.exist;

        expect(quiz.questionData.quizVariants).to.have.length(additiveWordsQuantity + rightAnswerQuantity);
        expect(word.foreign).to.include(quiz.questionData.quizWord);
        expect(quiz.questionData.rightVariants).to.have.length(word.native.length);
        expect(quiz.questionData.sounds).to.have.length(word.sounds.length);
    });

    it('returns component and data for REVERS way question', () => {
        const quiz = generateQuiz(word, variantsReverse);

        expect(quiz.QuizComponent).to.exist;
        expect(quiz.QuizComponent).to.exist;

        expect(quiz.questionData.quizVariants).to.have.length(additiveWordsQuantity + rightAnswerQuantity);
        expect(word.native).to.include(quiz.questionData.quizWord);
        expect(quiz.questionData.rightVariants).to.have.length(word.foreign.length);
        expect(quiz.questionData.sounds).to.have.length(word.sounds.length);
    });

    it('returns appropriate component and data for word without SOUNDS', () => {
        const testRandomFunction = variants => {
            return variants[1];
        };

        // testRandomFunction and variantsForwardAndSound специально для имитации "рандома"
        const quiz = generateQuiz(wordWithoutSound, variantsForwardAndSound, testRandomFunction);

        expect(quiz.QuizComponent).to.exist;
        expect(quiz.QuizComponent).to.exist;

        expect(quiz.questionData.quizVariants).to.have.length(additiveWordsQuantity + rightAnswerQuantity);
        expect(word.foreign).to.include(quiz.questionData.quizWord);
        expect(quiz.questionData.rightVariants).to.have.length(word.native.length);
        expect(quiz.questionData.sounds).to.have.length(0);
    });

    it('throw Error if cant return appropriate variant', () => {
        expect(() => { generateQuiz(wordWithoutSound, variantsOnlySound); }).to.throw();
    });
});

