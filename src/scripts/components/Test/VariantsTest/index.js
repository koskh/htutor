// @flow

import _ from 'lodash';
import * as React from 'react';

import SoundBtn from '../../SoundBtn';

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


export default class CardTest extends React.Component<Props, State> {
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
        foreignWordClass: 'btn-secondary', // default, not answered class
        isAnswered: false
    };


    soundBtn: ?SoundBtn = null;

    componentDidMount() {
        const { isForwardTranslate } = this.props;
        if (isForwardTranslate)
            this._playSound();
    }

    _playSound = () => {
        this.soundBtn && this.soundBtn.playSound();
    };

    _onAnswerClick = (answer: string): void => {
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
                <div className={cn('btn btn-lg btn-block mb-4', foreignWordClass)}>
                    <div className="row">
                        <div className="col-2">
                            &nbsp;
                        </div>
                        <div className="col-8 text-truncate">
                            {questionWord}
                        </div>
                        <div className="col-2 ">
                            <SoundBtn url={sound} isDisabled={!isForwardTranslate} ref={soundBtn => { this.soundBtn = soundBtn; }} />
                        </div>

                    </div>
                </div>

                {_.map(variants, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4 text-truncate" onClick={() => this._onAnswerClick(v)}>{v}</button>)}

            </div>
        );
    }
}

