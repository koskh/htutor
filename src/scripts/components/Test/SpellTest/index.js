// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';

import SoundBtn from '../../SoundBtn';
import { TemplateClass, foreignWordClasses } from '../TemplateClass';

export default class SpellTest extends TemplateClass {


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

            </div>
        );
    }
}

