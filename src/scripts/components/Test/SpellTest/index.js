// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';

import SoundBtn from '../../SoundBtn';
import { TemplateClass, foreignWordClasses } from '../TemplateClass';

export default class SpellTest extends TemplateClass {
    componentDidMount() {
        this._playSound();
    }

    _onChange({ target }: SyntheticInputEvent<*>) {
        const value = target.value;

        this._answerHandling(value);
    }

    _answerHandling = (answer: string): void => {
        const { isAnswered } = this.state;
        if (isAnswered)
            return;

        const { rightVariants } = this.props;

        const trimmedRightAnswers = _.map(rightVariants, v => {
            return _.first(_.split(v, ' ', 1));
        });
        const trimmedAnswer = _.trim(answer);

        const isRightAnswer = _.indexOf(trimmedRightAnswers, trimmedAnswer) !== -1;
        const foreignWordClass = isRightAnswer ? foreignWordClasses.right : foreignWordClasses.wrong;


        if (!isRightAnswer)
            return;

        // this._playSound();

        this.setState({ foreignWordClass, isAnswered: true });
        this.props.onAnswer(isRightAnswer);
    };

    render(): React.Element<any> {
        const { quizWord } = this.props;
        const { foreignWordClass } = this.state;

        return (
            <div>
                <div className="d-flex align-items-center justify-content-center quiz-head-height mb-4">
                    <div className={cn('btn btn-lg btn-block', foreignWordClass, 'qa-quiz-place')}>
                        <div className="row">
                            <div className="col-2">
                                &nbsp;
                            </div>
                            <div className="col-8 text-truncate qa-quiz-word">
                                {quizWord}
                            </div>
                            <div className="col-2 ">
                                &nbsp;
                            </div>

                        </div>
                    </div>
                </div>

                <div className="input-group input-group-lg mb-4">
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control qa-quiz-spell" placeholder="" autoFocus={true} onChange={e => this._onChange(e)} />
                </div>

            </div>
        );
    }
}

