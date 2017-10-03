// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';
import styles from './index.pcss';

import audioSrv from '../../services/audio';

type Props = {
    urls: Array<string>,
    isDisabled: boolean
}

export default class SoundBtn extends React.Component<Props> {
    static defaultProps: Props = {
        urls: [],
        isDisabled: false
    };

    props: Props;

    _onSoundClick() {
        this.playSound();
    }

    playSound() {
        (audioSrv: AudioService).play(_.sample(this.props.urls));
    }

    render(): React.Element<any> {
        const { isDisabled, urls } = this.props;
        return (
            <button type="button" className={cn('btn btn-secondary border-0 icon-4 icon-sound')} disabled={isDisabled || !urls.length} onClick={() => this._onSoundClick()} />
        );
    }
}

