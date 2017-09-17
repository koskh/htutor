// @flow

import _ from 'lodash';
import * as React from 'react';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './index.pcss';

type Props = {
    word: TestWord,
    questionWord: string,
    answers: Array<string>,
    sound: string,
    onAnswer: Function
}

type State = {
    foreignWordClass: string,
    isAnswered: boolean
}


export default class CardTest extends React.Component<Props, State> {
    props: Props;
    state: State = {
        foreignWordClass: 'btn-light', // default, not answered class
        isAnswered: false
    };
    static defaultProps: Props = {
        word: { foreign: [], native: [], sounds: [], shuffle: [] },
        questionWord: '',
        answers: [],
        sound: '',
        onAnswer: () => {}
    };


    audio: any = null;

    componentDidMount() {
        this._playSound();
    }

    _playSound = () => {
        this.audio.play();
    };

    onAnswerClick = (answer: string): void => {
        const { isAnswered } = this.state;
        if (isAnswered)
            return;

        const { word } = this.props;
        invariant(word, 'CardTest need props.word');

        const isRightAnswer = _.indexOf(word.native, answer) !== -1;
        const foreignWordClass = isRightAnswer ? 'btn-success' : 'btn-danger';
        this.setState({ foreignWordClass, isAnswered: true });

        this.props.onAnswer(isRightAnswer);
    };


    render(): React.Element<any> {
        const { questionWord, answers, sound } = this.props;
        const { foreignWordClass } = this.state;

        return (
            <div>
                <audio id="audio" src={`${sound}`} ref={audio => { this.audio = audio; }} />

                <button type="button" className={cn('btn  btn-lg btn-block mb-4', foreignWordClass)}>{questionWord}</button>

                <button type="button" className="btn btn-secondary" disabled={!sound} onClick={this._playSound}>Звук</button>

                <div className={`row ${styles.separator}`} />

                {_.map(answers, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4" onClick={() => this.onAnswerClick(v)}>{v}</button>)}

                <div className={`row ${styles.separator}`} />

            </div>
        );
    }
}

