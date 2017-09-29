// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';
import styles from './index.pcss';

import SoundBtn from '../../SoundBtn';
import { TemplateClass, foreignWordClasses } from '../TemplateClass';


export default class ForwardVariantsTest extends TemplateClass {
    componentDidMount() {
        this._playSound();
    }

    _answerHandling = (answer: string): void => {
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
        const { quizVariants, sounds } = this.props;
        const { foreignWordClass } = this.state;

        return (
            <div>
                <div className="row mb-4">
                    <div className="col d-flex align-items-center justify-content-center">
                        <div className={cn('btn btn-lg btn-block d-flex align-items-center justify-content-center rounded-circle ', styles['quiz-place'], foreignWordClass, 'qa-quiz-place')}>
                            <SoundBtn urls={sounds} ref={soundBtn => { this.soundBtn = soundBtn; }} />
                        </div>
                    </div>
                </div>

                {_.map(quizVariants, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4 text-truncate qa-quiz-variant" onClick={() => this._answerHandling(v)}>{v}</button>)}

            </div>
        );
    }
}
