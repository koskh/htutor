// @flow

import _ from 'lodash';
import * as React from 'react';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './index.pcss';

type Props = {
    word: TestWord,
    foreignWord: string,
    answers: Array<string>,
    sound: string,
    onAnswer: Function
}

type State = {
    foreignWordClass: string
}


export default class CardTest extends React.Component<Props, State> {
    props: Props;
    state: State = {
        foreignWordClass: 'btn-light', // default, not answered class
    };
    static defaultProps: Props = {
        word: {},
        foreignWord: '',
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
        const { word } = this.props;
        invariant(word, 'CardTest need props.word');

        const isRightAnswer = _.indexOf(word.native, answer) !== -1;
        const foreignWordClass = isRightAnswer ? 'btn-success' : 'btn-danger';
        this.setState({ foreignWordClass });

        this.props.onAnswer();
    };


    render(): React.Element<any> {
        const { word, foreignWord, answers, sound } = this.props;
        // const { foreignWord, answers, sound } = this._getData(word);
        const { foreignWordClass } = this.state;

        invariant(word, 'CardTest need props.word');

        return (
            <div>
                <audio id="audio" src={`${sound}`} ref={audio => { this.audio = audio; }} />

                <button type="button" className={cn('btn  btn-lg btn-block mb-4', foreignWordClass)}>{foreignWord}</button>

                <button type="button" className="btn btn-secondary" onClick={this._playSound}>Звук</button>

                <div className={`row ${styles.separator}`} />

                {_.map(answers, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4" onClick={() => this.onAnswerClick(v)}>{v}</button>)}

                <div className={`row ${styles.separator}`} />

            </div>
        );
    }
}

