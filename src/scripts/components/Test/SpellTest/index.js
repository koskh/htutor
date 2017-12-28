// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';

import templateStyles from '../TemplateClass/index.pcss';
import localStyles from './index.pcss';

import { TemplateClass, foreignWordClasses } from '../TemplateClass';

export default class SpellTest extends TemplateClass {
    input: ?HTMLElement = null;

    componentDidMount() {
        this._setInputFocus();
    }

    _setInputFocus() {
        this.input && this.input.focus();
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
        this._setInputFocus();

        if (!isRightAnswer)
            return;

        // this._playSound();
        this.setState({ foreignWordClass, isAnswered: true });
        this.props.onAnswer(isRightAnswer);
    };

    _onHelpClick() {
        const { rightVariants } = this.props;
        const trimmedRightAnswer = _.first(_.split(rightVariants[0], ' ', 1));
        const { answer } = this.state;

        const replacePosition = getWrongPosition(answer, trimmedRightAnswer);

        const answerPart = answer.substr(0, replacePosition);
        const helpedPart = trimmedRightAnswer[replacePosition];

        const helpedAnswer = answerPart + helpedPart;
        this._answerHandling(helpedAnswer);


        function getWrongPosition(word: string, rightWord: string): number {
            let position = 0;

            for (position; position < word.length; position += 1) {
                if (word[position] !== rightWord[position])
                    break;
            }

            return position;
        }
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
                <div className={`d-flex align-items-center justify-content-center mb-4 ${templateStyles['quiz-head-height']}`}>
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
                    <span className="input-group-addon qa-quiz-help" onClick={() => this._onHelpClick()}>
                        <button type="button" className="btn border-0 icon icon-4 icon-flashlight" />
                    </span>
                    <input
                        type="text"
                        className="form-control text-lowercase qa-quiz-spell"
                        placeholder={placeholder}
                        value={answer}
                        ref={input => {
                            this.input = input;
                        }}
                        onChange={e => {
                            this._onChange(e);
                        }}
                    />
                </div>

            </div>
        );
    }
}

