// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
import ForwardVariantsTest from '../../../components/Test/ForwardVariantsTest';
import ReverseVariantsTest from '../../../components/Test/ReverseVariantsTest';
import SoundTest from '../../../components/Test/SoundTest';
import SpellTest from '../../../components/Test/SpellTest';


import generateQuiz from './generateQuiz';

import type { ComponentStore } from '../store/reducer';
import type { SettingsStore } from '../../../services/appSettings/store/reducer';

export type QuizOptions = { isForward: boolean, mustHaveSound?: boolean, additiveWordsQuantity?: number };
export type QuizVariant = { Component: React.createClass, options: QuizOptions }
export type QuizVariants = Array<QuizVariant>
export type QuestionData = { quizVariants: Array<string>, rightVariants: Array<string>, sounds: Array<string>}

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    resetStore: Function,
    testComponentStore: ComponentStore,
    settingsStore: SettingsStore,
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
        const blockId = this.getBlockId();
        const lessonId: ?string = this.props.match.params.lessonId;
        this.props.makeFetch(blockId, lessonId);
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

    getBlockId() {
        const blockIdFromSettings = this.props.settingsStore.data && this.props.settingsStore.data.currentBlockId;
        return this.props.match.params.blockId || blockIdFromSettings;
    }


    _generateQuiz(word: TestWord): {QuizComponent: React.createClass, questionData: QuestionData} {
        const variants: QuizVariants = [
            { Component: ForwardVariantsTest, options: { isForward: true, mustHaveSound: false } },
            { Component: ReverseVariantsTest, options: { isForward: false, mustHaveSound: false } },
            { Component: SoundTest, options: { isForward: true, mustHaveSound: true } },
            { Component: SpellTest, options: { isForward: false, mustHaveSound: false } },
        ];

        return generateQuiz(word, variants);
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
        const { QuizComponent, questionData } = this._generateQuiz(word);

        return (

            <article>

                <PendingIndicator pending={isPending}>
                    <QuizComponent key={word.foreign[0]} {...questionData} onAnswer={this.onAnswer} />
                    <button type="button" className="btn btn-warning btn-lg btn-block" onClick={this.onNextClick}>Пропустить</button>
                </PendingIndicator>

            </article>
        );
    }
}
