// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
// import CardTest from '../../../components/CardTest';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    homeComponentStore: ComponentStore,
    history: any
}

// type State = {
//     indexCurrentWord: number
// }

export default class Test extends React.Component<Props> {
    props: Props;

    // state: State = {
    //     indexCurrentWord: 0
    // };

    componentWillMount() {
        document.title = 'HTutor· Список доступных уроков';
    }

    componentDidMount() {
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }


    // onNextClick = () => {
    //     const { data } = this.props.componentStore;
    //     const length = data && data.words && data.words.length;
    //
    //     let { indexCurrentWord } = this.state;
    //     indexCurrentWord += 1;
    //     // indexCurrentWord = indexCurrentWord === length ? 0 : indexCurrentWord;
    //
    //     if (indexCurrentWord === length) {
    //         this.props.history.push('/home');
    //         return;
    //     }
    //
    //     this.setState({ indexCurrentWord });
    // };
    //
    // onAnswer = (isRightAnswer: boolean): void => {
    //
    //     const timeNextQuestion = 1000;
    //     setTimeout(() => {
    //         this.onNextClick()
    //     }, timeNextQuestion);
    // };

    // _generateQuestionData(word: TestWord) {
    //     const variantsQnt = 3;
    //
    //     const foreignWord = _.shuffle(word.foreign)[0];
    //     const nativeWord = _.shuffle(word.native)[0];
    //     const sound = _.shuffle(word.sounds)[0];
    //     const shuffledWords = _.slice(_.shuffle(word.shuffle), 0, variantsQnt);
    //     let answers = [nativeWord, ...shuffledWords];
    //     answers = _.shuffle(answers);
    //
    //     return { foreignWord, answers, sound };
    // }

    render() {
        const { isPending, data } = this.props.homeComponentStore;

        // const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Список доступных уроков</h4>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }

        // const word: TestWord = data.words[indexCurrentWord];
        // const questionData = this._generateQuestionData(word);

        return (

            <article>
                <h4 className="text-center">Список доступных уроков</h4>

                <PendingIndicator pending={isPending}>
                    список уроков
                </PendingIndicator>

            </article>
        );
    }
}
