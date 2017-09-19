// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
import CardTest from '../../../components/VariantsTest';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    resetStore: Function,
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
        const lessonId = this.props.match.params.lessonId;
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
        // indexCurrentWord = indexCurrentWord === length ? 0 : indexCurrentWord;

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

    _generateEngToRusQuestion(word: TestWord) { // EngToRus
        const variantsQnt = 4;

        const rightVariants = word.native; // привильн ответы
        const questionWord = _.shuffle(word.foreign)[0]; // вопрошаемое слово
        const nativeWord = _.shuffle(word.native)[0]; // правильн русск вариант
        const sound = _.shuffle(word.sounds)[0]; // файл звука
        const shuffledWords = _.slice(_.shuffle(word.shuffledNative), 0, variantsQnt);
        let variants = [nativeWord, ...shuffledWords];
        variants = _.shuffle(variants); // запутываемые варианты ответа

        const isForwardTranslate = true;

        return { questionWord, variants, rightVariants, sound, isForwardTranslate };
    }

    _generateRusToEngQuestion(word: TestWord) { // RusToEng
        const variantsQnt = 4;

        const rightVariants = word.foreign; // привильн ответы
        const questionWord = _.shuffle(word.native)[0]; // вопрошаемое русск вариант
        const nativeWord = _.shuffle(word.foreign)[0]; //  правильн иностран слово
        const sound = _.shuffle(word.sounds)[0]; // файл звука пустой, что бы не подсказывало
        const shuffledWords = _.slice(_.shuffle(word.shuffledForeign), 0, variantsQnt);
        let variants = [nativeWord, ...shuffledWords];
        variants = _.shuffle(variants); // запутываемые варианты ответа

        const isForwardTranslate = false;

        return { questionWord, variants, rightVariants, sound, isForwardTranslate };
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

        const questionGenerators = {
            cardForward: this._generateEngToRusQuestion,
            cardReverse: this._generateRusToEngQuestion
        }

        const questionData = _.sample(questionGenerators)(word);

        return (

            <article>

                <PendingIndicator pending={isPending}>
                    <CardTest key={word.foreign[0]} word={word} {...questionData} onAnswer={this.onAnswer} />
                    <button type="button" className="btn btn-warning btn-lg btn-block" onClick={this.onNextClick}>Пропустить</button>
                </PendingIndicator>

            </article>
        );
    }
}
