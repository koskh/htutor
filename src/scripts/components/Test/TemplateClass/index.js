// @flow

// import _ from 'lodash';
import * as React from 'react';

// import cn from 'classnames';
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

export class TemplateClass extends React.Component<Props, State> {
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


    _playSound() {
        this.soundBtn && this.soundBtn.playSound();
    }

    _onAnswerClick = (answer: string): void => {
        throw new Error('AbstractTest component. Yoy need to override.');
    };


    render(): React.Element<any> {
        throw new Error('AbstractTest component. Yoy need to override.');
    }
}

