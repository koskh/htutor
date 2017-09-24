// @flow

import _ from 'lodash';
import * as React from 'react';

import cn from 'classnames';
import SoundBtn from '../../SoundBtn';

import ForwardVariantsTest from '../ForwardVariantsTest';

export default class ReverseVariantsTest extends ForwardVariantsTest {
    componentDidMount() {

    }

    _onAnswerClick = (answer: string): void => {
        const { isAnswered } = this.state;
        if (isAnswered)
            return;

        this._playSound();

        const { rightVariants } = this.props;

        const isRightAnswer = _.indexOf(rightVariants, answer) !== -1;

        const foreignWordClass = isRightAnswer ? 'btn-success' : 'btn-danger';
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
                            <SoundBtn urls={sounds} isDisabled={true} ref={soundBtn => { this.soundBtn = soundBtn; }} />
                        </div>

                    </div>
                </div>

                {_.map(quizVariants, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4 text-truncate qa-quiz-variant" onClick={() => this._onAnswerClick(v)}>{v}</button>)}

            </div>
        );
    }
}

