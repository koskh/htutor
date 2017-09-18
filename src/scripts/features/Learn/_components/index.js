// @flow

import _ from 'lodash';
import * as React from 'react';

import invariant from 'invariant';
import cn from 'classnames';

import PendingIndicator from '../../../components/PendingIndicator';

import styles from './index.pcss';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    resetStore: Function,
    learnComponentStore: ComponentStore,
    match: any,
    history: any
}

// type State = {
//     indexCurrentWord: number
// }

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = AudioContext && new AudioContext();

export default class Test extends React.Component<Props> {
    props: Props;

    // state: State = {
    //     indexCurrentWord: 0
    // };

    audio: any = null;

    componentWillMount() {
        document.title = 'HTutor· Изучение урока';
    }

    componentDidMount() {
        const lessonId = this.props.match.params.lessonId;
        this.props.makeFetch(lessonId);
    }

    componentWillUnmount() {
        this.props.cancelFetch();
        this.props.resetStore();
        // debugger;
    }

    // onLearnClick(lessonId: number) {
    //     this.props.history.push(`/learn/${lessonId}`);
    // }
    //
    // onTestClick(lessonId: number) {
    //     this.props.history.push(`/test/${lessonId}`);
    // }

    _playSound = (word: Word) => {
        const url = word.sounds[0];
        if (!audioContext) {
            this.audio.src = url;
            this.audio.load();
            this.audio.play();
        } else {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            request.onload = () => {
                audioContext.decodeAudioData(request.response, buffer => {
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;
                    source.connect(audioContext.destination);
                    source.start(0);
                });
            };

            request.send();
        }
    };

    render() {
        const { isPending, data } = this.props.learnComponentStore;

        // const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Изучение урока...</h4>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }

        // const word: TestWord = data.words[indexCurrentWord];
        // const questionData = this._generateQuestionData(word);


        return (

            <article>
                <audio id="audio" ref={audio => { this.audio = audio; }} />

                <h4 className="text-center">{data.title}</h4>

                {_.map((data.words: Array<Word>), (v, i) =>
                    (<div className="relative btn btn-light btn-lg btn-block text-left" key={i}>
                        <div className="">{v.foreign.join(',')}</div>
                        <div className="mr-4 fs-3 lh-3 text-wrap">{v.native.join(' / ')}</div>
                        <button type="button" className={cn('btn btn-secondary', styles['sound-btn'], 'mr-3 icon-sound')} disabled={!(v.sounds.length)} onClick={() => this._playSound(v)} />
                    </div>)
                )}

            </article>
        );
    }
}
