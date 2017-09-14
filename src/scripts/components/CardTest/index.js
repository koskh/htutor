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
    }


    render(): React.Element<any> {
        const { word } = this.props;
        const filesPath = '/files/';
        const variants = 3;

        return (
            <div>
                <audio id="audio" src={`${filesPath}${word.sounds[0]}`} ref={audio => { this.audio = audio; }} />

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.foreign[0]}</button>

                <button type="button" className="btn btn-secondary" onClick={this._playSound}>Звук</button>

                <div className={`row ${styles.separator}`} />

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.native[0]}</button>

                {_.times(variants, i => <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.shuffle[i]}</button>)}

                <div className={`row ${styles.separator}`} />

                <button type="button" className="btn btn-warning btn-lg btn-block">Пропустить</button>

            </div>
        );
    }
}

