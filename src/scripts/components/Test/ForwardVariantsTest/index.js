// @flow

import _ from 'lodash';
import * as React from 'react';

import cn from 'classnames';
// import styles from './index.pcss';

import SoundBtn from '../../SoundBtn';

type Props = {
    quizWord: string,
    rightVariants: Array<string>,
    quizVariants: Array<string>,
    sounds: Array<string>,
    onAnswer: Function
}

type State = {
    foreignWordClass: string,
    isAnswered: boolean
}

export const foreignWordClasses = {
    default: 'btn-secondary',
    right: 'btn-success',
    wrong: 'btn-danger'
};

export default class ForwardVariantsTest extends React.Component<Props, State> {
    static defaultProps: Props = {
        quizWord: '',
        rightVariants: [],
        quizVariants: [],
        sounds: [],
        onAnswer: () => {}
    };

    props: Props;

    state: State = {
        foreignWordClass: foreignWordClasses.default,
        isAnswered: false
    };

    soundBtn: ?SoundBtn = null;

    componentDidMount() {
        this._playSound();
    }

    _playSound() {
        this.soundBtn && this.soundBtn.playSound();
    }

    _onAnswerClick = (answer: string): void => {
        const { isAnswered } = this.state;
        if (isAnswered)
            return;

        const { rightVariants } = this.props;

        const isRightAnswer = _.indexOf(rightVariants, answer) !== -1;

        const foreignWordClass = isRightAnswer ? foreignWordClasses.right : foreignWordClasses.wrong;
        this.setState({ foreignWordClass, isAnswered: true });

        this.props.onAnswer(isRightAnswer);
    };


    render(): React.Element<any> {
        const { quizWord, quizVariants, sounds } = this.props;
        const { foreignWordClass } = this.state;

        return (
            <div>
                <div className={cn('btn btn-lg btn-block mb-4', foreignWordClass, 'qa-quiz-place')}>
                    <div className="row">
                        <div className="col-2">
                            &nbsp;
                        </div>
                        <div className="col-8 text-truncate qa-quiz-word">
                            {quizWord}
                        </div>
                        <div className="col-2 ">
                            <SoundBtn urls={sounds} ref={soundBtn => { this.soundBtn = soundBtn; }} />
                        </div>

                    </div>
                </div>

                {_.map(quizVariants, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4 text-truncate qa-quiz-variant" onClick={() => this._onAnswerClick(v)}>{v}</button>)}

            </div>
        );
    }
}

