// @flow

import _ from 'lodash';

import type {QuizOptions, QuizVariant, QuizVariants, QuestionData } from '../../index';

export default function generateQuiz(word: TestWord, variants: QuizVariants): {QuizComponent: React$Component<*>, questionData: QuestionData} {
    const variant = getAppropriateQuizVariant(word, variants);
    const QuizComponent = variant.Component;
    const questionData = getQuestionData(word, variant.options);

    return { QuizComponent, questionData };
}

function getAppropriateQuizVariant(word, variants): QuizVariant {
    let variant: QuizVariant = _.sample(variants);

    try {
        const { mustHaveSound } = variant.options;
        if (mustHaveSound && !word.sounds.length)
            throw new Error('Need other QuizVariant');
    } catch (e) {
        const variantsCanWithoutSound = _.filter(variants, v => { return v.options.mustHaveSound === false; });
        variant = _.sample(variantsCanWithoutSound);
    }

    return variant;
}

function getQuestionData(word: TestWord, options: QuizOptions): QuestionData {
    const { native, foreign, shuffledNative, shuffledForeign, sounds } = word;
    const { isForward, additiveWordsQuantity = 4 } = options;

    const quizWord = _.sample(isForward ? foreign : native);
    const rightVariants = isForward ? native : foreign;

    const additiveWords = _.slice(isForward ? shuffledNative : shuffledForeign, 0, additiveWordsQuantity);
    const quizVariants = _.shuffle([_.sample(isForward ? native : foreign), ...additiveWords]);

    return { quizWord, quizVariants, rightVariants, sounds };
}
