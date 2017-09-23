// @flow

import * as React from 'react';
import cn from 'classnames';
import styles from './index.pcss';

import audioSrv from '../../services/audio';

type Props = {
    url: string,
    isDisabled: boolean
}

export default class SoundBtn extends React.Component<Props> {
    static defaultProps: Props = {
        url: '',
        isDisabled: false
    };

    props: Props;

    _onSoundClick() {
        this.playSound();
    }

    playSound() {
        (audioSrv: AudioService).play(this.props.url);
    }

    render(): React.Element<any> {
        const { isDisabled, url } = this.props;
        return (
            <button type="button" className={cn('btn btn-secondary', styles['sound-btn'], 'icon-sound')} disabled={isDisabled || !url} onClick={() => this._onSoundClick()} />
        );
    }
}

