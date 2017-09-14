// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';

import styles from './index.pcss';

//eslint-disable-next-line

type Props = {
    word: TestWord
}

// const defaultProps: Props = {
//     children: null
// };


export default class CardTest extends React.Component<Props> {
    props: Props;
    // state: State;
    // static defaultProps: Props = {
    //     children: null
    // };

    // constructor(props: any) {
    //     super(props);
    // }

    audio: any = null;
    // soundFile: any = null;

    componentDidMount() {
        // const { word } = this.props;
        // this._getSoundFile(word.sounds);
    }

    // _getSoundFile = (sounds: Array<string>) =>{
    //     this.soundFile =
    // }
    //
    _playSound = () => {
        this.audio.play();
        // console.log('Play sound');
    };

    onAnswerClick = () => {

    };

    onNextClick = () => {

};


    render(): React.Element<any> {
        const { word } = this.props;
        const filesPath = '/files/';
        const variantsQnt = 3;

        const foreignWord = _.shuffle(word.foreign)[0];
        const nativeWord = _.shuffle(word.native)[0];
        const shuffledWords = _.slice(_.shuffle(word.shuffle), 0, variantsQnt);
        let answers = [nativeWord, ...shuffledWords];
        answers = _.shuffle(answers);


        return (
            <div>
                <audio id="audio" src={`${filesPath}${word.sounds[0]}`} ref={audio => { this.audio = audio; }} />

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{foreignWord}</button>

                <button type="button" className="btn btn-secondary" onClick={this._playSound}>Звук</button>

                <div className={`row ${styles.separator}`} />

                {_.map(answers, (v, i) => <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-4" onClick={this.onAnswerClick}>{v}</button>)}

                <div className={`row ${styles.separator}`} />

            </div>
        );
    }
}

