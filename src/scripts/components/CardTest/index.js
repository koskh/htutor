// @flow

import _ from 'lodash';
import * as React from 'react';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './index.pcss';

//eslint-disable-next-line
type Props = {
    word: TestWord,
    onAnswer: Function
}

type State = {
    foreignWordClass: string
}


export default class CardTest extends React.Component<Props, State> {
    props: Props;
    state: State = {
        foreignWordClass: 'btn-light', //default, not answered class
    };
    // static defaultProps: Props = {
    //     children: null
    // };


    audio: any = null;

    componentDidMount() {
        this._playSound();
    }

    componentWillReceiveProps() {
        this.setState({ foreignWordClass: 'btn-light' });
    }

    componentDidUpdate() {
        if (this.state.foreignWordClass === 'btn-light')
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
        const { word } = this.props;
        const { foreignWordClass } = this.state;

        invariant(word, 'CardTest need props.word');

        const variantsQnt = 3;

        const foreignWord = _.shuffle(word.foreign)[0];
        const nativeWord = _.shuffle(word.native)[0];
        const sound = _.shuffle(word.sounds)[0];
        const shuffledWords = _.slice(_.shuffle(word.shuffle), 0, variantsQnt);
        let answers = [nativeWord, ...shuffledWords];
        answers = _.shuffle(answers);

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

