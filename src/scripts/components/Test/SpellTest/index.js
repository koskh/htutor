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
            return _.toLower(_.first(_.split(v, ' ', 1)));
        });
        const trimmedAnswer = _.toLower(_.trim(answer));

        const isRightAnswer = _.indexOf(trimmedRightAnswers, trimmedAnswer) !== -1;
        const foreignWordClass = isRightAnswer ? foreignWordClasses.right : foreignWordClasses.wrong;

        this.setState({ answer: trimmedAnswer });

        if (!isRightAnswer)
            return;

        // this._playSound();

        this.setState({ foreignWordClass, isAnswered: true });
        this.props.onAnswer(isRightAnswer);
    };

    _onHelpClick() {
        const { rightVariants } = this.props;
        const trimmedRightAnswer = _.first(_.split(rightVariants[0], ' ', 1));

        const {answer} = this.state;
        const answeredLength = answer.length;

        if (answer.length === trimmedRightAnswer.length)
            return;

        const helpedAnswer = answer + trimmedRightAnswer[answeredLength];
        this.setState({answer: helpedAnswer});
    }

    _getPlaceholder(rightVariants: Array<string>): string {
        const trimmedRightAnswer = _.first(_.split(rightVariants[0], ' ', 1));
        return _.replace(trimmedRightAnswer, /./gi, '#');
    }

    render(): React.Element<any> {
        const { quizWord, rightVariants } = this.props;
        const { foreignWordClass, answer } = this.state;

        const placeholder: string = this._getPlaceholder(rightVariants);

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
                    <span className="input-group-addon qa-quiz-help" onClick={() => this._onHelpClick()}>@</span>
                    <input type="text" className="form-control text-lowercase qa-quiz-spell" placeholder={placeholder} value={answer} autoFocus={true} onChange={e => this._onChange(e)} />
                </div>

            </div>
        );
    }
}

