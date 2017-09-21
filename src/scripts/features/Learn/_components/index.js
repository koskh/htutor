// @flow

import _ from 'lodash';
import * as React from 'react';

import invariant from 'invariant';
import cn from 'classnames';

import audioSrv from '../../../services/audio';

import PendingIndicator from '../../../components/PendingIndicator';

import styles from './index.pcss';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    resetStore: Function,
    learnComponentStore: ComponentStore,
    match: any
}

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
    }

    _playSound = (word: Word) => {
        const url = word.sounds[0];
        audioSrv.play(url);
    };

    render() {
        const { isPending, data } = this.props.learnComponentStore;

        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Изучение урока...</h4>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }


        return (

            <article>
                <audio id="audio" ref={audio => { this.audio = audio; }} />

                <h4 className="text-center">{data.title}</h4>

                {_.map((data.words: Array<Word>), (v, i) =>
                    (
                        <div className="relative btn btn-light btn-lg btn-block text-left" key={i}>
                            <div className="row">
                                <div className="col-9">
                                    <div>{v.foreign.join(',')}</div>
                                    <div className="fs-3 text-wrap">{v.native.join(' / ')}</div>
                                </div>
                                <div className="col-3 align-self-center text-right">
                                    <button type="button" className={cn('btn btn-secondary', styles['sound-btn'], ' icon-sound')} disabled={!(v.sounds.length)} onClick={() => this._playSound(v)} />
                                </div>
                            </div>
                        </div>
                    )
                )}

            </article>
        );
    }
}
