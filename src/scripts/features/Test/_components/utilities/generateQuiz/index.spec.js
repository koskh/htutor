import { expect } from 'chai';
// import sinon from 'sinon';

import generateQuiz from './';

const variantsForward = {
    forward: { Component: () =>{}, options: { isForward: true, mustHaveSound: false } },
};

const variantsReverse = {
    forward: { Component: () =>{}, options: { isForward: false, mustHaveSound: false } },
};

const variantsForwardAndSound = {
    forward: { Component: () =>{}, options: { isForward: true, mustHaveSound: false } },
    sound: { Component: { name: 'soundComonent' }, options: { isForward: false, mustHaveSound: true } },
};

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
});

