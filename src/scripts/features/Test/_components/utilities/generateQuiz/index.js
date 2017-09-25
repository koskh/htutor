// @flow

import _ from 'lodash';

import type {QuizVariant, QuizVariants, QuestionData} from '../../index';

export default function generateQuiz(word: TestWord, variants: QuizVariants): {QuizComponent: React$Component<*>, questionData: QuestionData} {
    let variant: QuizVariant = _.sample(variants);

    try {
        const { mustHaveSound } = variant.options;
        if (mustHaveSound && !word.sounds.length)
            throw new Error('Need other QuizVariant');
    } catch (e) {
        const variantsCanWithoutSound = _.filter(variants, v => { return v.options.mustHaveSound === false; });
        variant = _.sample(variantsCanWithoutSound);
    }


    const QuizComponent = variant.Component;
    const questionData = getQuestionData(word, variant.options);

    return { QuizComponent, questionData };
}

function getQuestionData(word: TestWord, options: {[key: string]: boolean}): QuestionData {
    const additiveWordsQuantity = 4;
    const { native, foreign, shuffledNative, shuffledForeign, sounds } = word;
    const { isForward } = options;

    const quizWord = _.sample(isForward ? foreign : native);
    const rightVariants = isForward ? native : foreign;

    const additiveWords = _.slice(isForward ? shuffledNative : shuffledForeign, 0, additiveWordsQuantity);
    const quizVariants = _.shuffle([_.sample(isForward ? native : foreign), ...additiveWords]);

    return { quizWord, quizVariants, rightVariants, sounds };
}
