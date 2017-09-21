// @flow

import _ from 'lodash';
import * as React from 'react';

import audioSrv from '../../services/audio';

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
    props: Props;
    state: State = {
        foreignWordClass: 'btn-secondary', // default, not answered class
        isAnswered: false
    };
    static defaultProps: Props = {
        rightVariants: [],
        questionWord: '',
        variants: [],
        sound: '',
        isForwardTranslate: true,
        onAnswer: () => {}
    };


    componentDidMount() {
        const { isForwardTranslate } = this.props;
        if (isForwardTranslate)
            this._playSound();
    }

    _playSound = () => {
        const url = this.props.sound;
        audioSrv.play(url);
    };

    onAnswerClick = (answer: string): void => {
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
                        <div className="col-2">
                            <button type="button" className={cn('btn btn-secondary', styles['sound-btn'], 'mr-3 icon-sound')} disabled={!(sound && isForwardTranslate)} onClick={this._playSound} />
                        </div>

                    </div>
                </div>

                {_.map(variants, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4 text-truncate" onClick={() => this.onAnswerClick(v)}>{v}</button>)}

            </div>
        );
    }
}

