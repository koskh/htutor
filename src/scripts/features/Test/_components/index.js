// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
import ForwardVariantsTest from '../../../components/Test/ForwardVariantsTest';
import ReverseVariantsTest from '../../../components/Test/ReverseVariantsTest';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: (lessonId: ?string) => void,
    cancelFetch: () => void,
    resetStore: () => void,
    testComponentStore: ComponentStore,
    history: any,
    match: any
}

type State = {
    indexCurrentWord: number
}


export default class Test extends React.Component<Props, State> {
    props: Props;

    state: State = {
        indexCurrentWord: 0
    };

    componentWillMount() {
        document.title = 'HTutor· проверяем';
    }

    componentDidMount() {
        const lessonId: ?string = this.props.match.params.lessonId;
        this.props.makeFetch(lessonId);
    }

    componentWillUnmount() {
        this.props.cancelFetch();
        this.props.resetStore();
        // debugger;
    }


    onNextClick = () => {
        const { data } = this.props.testComponentStore;
        const length = data && data.words && data.words.length;

        let { indexCurrentWord } = this.state;
        indexCurrentWord += 1;

        if (indexCurrentWord === length) {
            this.props.history.push('/home');
            return;
        }

        this.setState({ indexCurrentWord });
    };

    onAnswer = (isRightAnswer: boolean): void => {
        const timeNextQuestion = 1000;
        setTimeout(() => {
            this.onNextClick();
        }, timeNextQuestion);
    };


    _getQuestionData(word: TestWord, isForward: boolean = true): { quizVariants: Array<string>, rightVariants: Array<string>, sounds: Array<string>} {
        const additiveWordsQuantity = 4;
        const { native, foreign, shuffledNative, shuffledForeign, sounds } = word;

        const rightVariants = isForward ? foreign : native;

        const additiveWords = _.slice(isForward ? shuffledNative : shuffledForeign, 0, additiveWordsQuantity);
        const quizVariants = _.shuffle([_.sample(rightVariants), ...additiveWords]);

        return { quizVariants, rightVariants, sounds };
    }

    render() {
        const { isPending, data } = this.props.testComponentStore;
        const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }

        const word: TestWord = data.words[indexCurrentWord];

        // const questionData = _.sample(questionGenerators)(word);

        const QuizVariants = {
            forward: { component: ForwardVariantsTest, isForward: true },
            reverse: { component: ReverseVariantsTest, isForward: false }
        };

        const quiz = _.sample(QuizVariants);
        const QuizComponent = quiz.component;
        const questionData = this._getQuestionData(word, quiz.isForward);

        return (

            <article>

                <PendingIndicator pending={isPending}>
                    <QuizComponent key={word.foreign[0]} word={word} {...questionData} onAnswer={this.onAnswer} />
                    <button type="button" className="btn btn-warning btn-lg btn-block" onClick={this.onNextClick}>Пропустить</button>
                </PendingIndicator>

            </article>
        );
    }
}
