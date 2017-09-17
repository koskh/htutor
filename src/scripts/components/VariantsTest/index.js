// @flow

import _ from 'lodash';
import * as React from 'react';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './index.pcss';


type Props = {
    rightVariants: Array<string>,
    questionWord: string,
    variants: Array<string>,
    sound: string,
    isForwardTranslate: boolean,
    onAnswer: Function
}

type State = {
    foreignWordClass: string,
    isAnswered: boolean
}

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = AudioContext && new AudioContext();

export default class CardTest extends React.Component<Props, State> {
    props: Props;
    state: State = {
        foreignWordClass: 'btn-secondary', // default, not answered class
        isAnswered: false
    };
    static defaultProps: Props = {
        rightVariants: [],
        questionWord: '',
        variants: [],
        sound: '',
        isForwardTranslate: true,
        onAnswer: () => {}
    };


    audio: any = null;

    componentDidMount() {
        const { isForwardTranslate } = this.props;
        if (isForwardTranslate)
            this._playSound();
    }

    _playSound = () => {
        if (!audioContext) {
            this.audio.play();
        }

        else {
            const url = this.props.sound;
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            request.onload = () => {
                audioContext.decodeAudioData(request.response, buffer => {
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;
                    source.connect(audioContext.destination);
                    source.start(0);
                });
            };

            request.send();
        }
    };

    onAnswerClick = (answer: string): void => {
        const { isAnswered } = this.state;
        if (isAnswered)
            return;

        const { isForwardTranslate, rightVariants } = this.props;

        if (!isForwardTranslate)
            this._playSound();

        const isRightAnswer = _.indexOf(rightVariants, answer) !== -1;

        const foreignWordClass = isRightAnswer ? 'btn-success' : 'btn-danger';
        this.setState({ foreignWordClass, isAnswered: true });

        this.props.onAnswer(isRightAnswer);
    };


    render(): React.Element<any> {
        const { questionWord, variants, sound, isForwardTranslate } = this.props;
        const { foreignWordClass } = this.state;

        return (
            <div>
                <audio id="audio" src={`${sound}`} ref={audio => { this.audio = audio; }} />

                <div className="relative">
                    <button type="button" className={cn('btn btn-lg btn-block mb-4', foreignWordClass)}>{questionWord}</button>
                    <button type="button" className={cn('btn btn-secondary', styles['sound-btn'], 'mr-3 icon-sound') } disabled={!(sound && isForwardTranslate)} onClick={this._playSound} ></button>
                </div>



                <div className={`row ${styles.separator}`} />

                {_.map(variants, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4" onClick={() => this.onAnswerClick(v)}>{v}</button>)}

                <div className={`row ${styles.separator}`} />

            </div>
        );
    }
}

