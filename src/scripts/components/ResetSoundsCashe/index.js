// @flow

import * as React from 'react';
import audioSrv from '../../services/audio';

import styles from './index.pcss';

type Props = {
    onClick?: Function,
//     name?: string,
//     children?: React.Node
}

type DefaultProps = {
//     name: ?string,
//     children: React.Node
    onClick: Function

};

const defaultProps: DefaultProps = {
//     name: null,
//     children: null
    onClick: () => {
        audioSrv.clearCache();
    }
};


const ResetSoundCashe = (props: Props) => {
    return (
        <div className="btn  btn-block btn-danger mb-2 text-left" onClick={props.onClick}>
            Очистить кеш звуков
        </div>
    );
};

ResetSoundCashe.defaultProps = defaultProps;

export default ResetSoundCashe;
