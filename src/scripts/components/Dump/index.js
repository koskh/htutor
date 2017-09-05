// @flow

import * as React from 'react';

import styles from './index.pcss';

type Props = {
    onClick?: Function,
    name?: string,
    children?: React.Node
}

type DefaultProps = {
    name: ?string,
    children: React.Node
};

const defaultProps: DefaultProps = {
    name: null,
    children: null
};


const Dump = (props: Props) => {
    return (
        <div className="outerClass" data-name={props.name} onClick={props.onClick}>
            <div className={styles.dump} >
                { props.children }
            </div>
        </div>
    );
};

Dump.defaultProps = defaultProps;

export default Dump;
