// @flow

import _ from 'lodash';
import * as React from 'react';
// import invariant from 'invariant';
// import cn from 'classnames';

import audioSrv from '../../../services/audio';

// import styles from './index.pcss';

type Props = {
    rightVariants: Array<string>,
    questionWord: string,
    variants: Array<string>,
    sound: string,
    onAnswer: Function
}

type State = {
    isAnswered: boolean
}


export default class AbstractTest extends React.Component<Props, State> {
    static defaultProps: Props = {
        rightVariants: [],
        questionWord: '',
        variants: [],
        sound: '',
        isForwardTranslate: true,
        onAnswer: () => {}
    };

    props: Props;

    state: State = {
        isAnswered: false
    };

    _onAnswerClick(answer: any): void {
        const isRightAnswer = true;
        this.props.onAnswer(isRightAnswer);
    }

    _onSoundClick() {
        const url = this.props.sound;
        (audioSrv: AudioService).play(url);
    }


    render(): React.Element<any> {
        return (
            <div>
                <div className="js-sound" onClick={() => this._onSoundClick()}>onSound</div>
                <div className="js-answer" onClick={() => this._onAnswerClick()}>onAnswer</div>
            </div>
        );
    }
}

