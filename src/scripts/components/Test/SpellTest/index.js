// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';

import SoundBtn from '../../SoundBtn';
import { TemplateClass, foreignWordClasses } from '../TemplateClass';

export default class SpellTest extends TemplateClass {
    _onChange({ target }: SyntheticInputEvent<*>) {
        const value = target.value;


        this._onAnswerClick(value);
    }

    _onAnswerClick = (answer: string): void => {
        const { isAnswered } = this.state;
        if (isAnswered)
            return;
        //
        // this._playSound();
        //
        // const { rightVariants } = this.props;
        //
        // const isRightAnswer = _.indexOf(rightVariants, answer) !== -1;
        //
        // const foreignWordClass = isRightAnswer ? foreignWordClasses.right : foreignWordClasses.wrong;

        // this.setState({ foreignWordClass, isAnswered: true });
        //
        // this.props.onAnswer(isRightAnswer);

        this.setState({isAnswered: true });

        this.props.onAnswer(true);
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
                    <span className="input-group-addon" >@</span>
                    <input type="text" className="form-control qa-quiz-spell" placeholder="" onChange={(e) => this._onChange(e)} />
                </div>

            </div>
        );
    }
}

