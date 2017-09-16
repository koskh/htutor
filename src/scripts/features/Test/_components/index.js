// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
import CardTest from '../../../components/CardTest';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    testComponentStore: ComponentStore
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
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }


    onNextClick = () => {
        const { data } = this.props.testComponentStore;
        const length = data && data.words && data.words.length;

        let { indexCurrentWord } = this.state;
        indexCurrentWord += 1;
        indexCurrentWord = indexCurrentWord === length ? 0 : indexCurrentWord;

        this.setState({ indexCurrentWord });
    };

    onAnswer = (isRightAnswer: boolean): void => {

        const timeNextQuestion = 1000;
        setTimeout(() => {
            this.onNextClick()
        }, timeNextQuestion);
    };

    _generateQuestionData(word: TestWord) {
        const variantsQnt = 3;

        const foreignWord = _.shuffle(word.foreign)[0];
        const nativeWord = _.shuffle(word.native)[0];
        const sound = _.shuffle(word.sounds)[0];
        const shuffledWords = _.slice(_.shuffle(word.shuffle), 0, variantsQnt);
        let answers = [nativeWord, ...shuffledWords];
        answers = _.shuffle(answers);

        return { foreignWord, answers, sound };
    }

    render() {
        const { isPending, data } = this.props.testComponentStore;

        const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <p className="text-center">Статистика слова: показов: 0, правильн: 0, ошибок: 0</p>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }

        const word: TestWord = data.words[indexCurrentWord];
        const questionData = this._generateQuestionData(word);

        return (

            <article>
                <p className="text-center">Статистика слова: показов: 0, правильн: 0, ошибок: 0</p>

                <PendingIndicator pending={isPending}>
                    <CardTest key={word.foreign[0]} word={word} {...questionData} onAnswer={this.onAnswer} />,
                    <button type="button" className="btn btn-warning btn-lg btn-block" onClick={this.onNextClick}>Пропустить</button>
                </PendingIndicator>

            </article>
        );
    }
}
